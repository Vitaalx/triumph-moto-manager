import { type IMotorcycleTryRepository } from "@application/ports/repositories/motorcycle-try";
import { type MotorcycleTryEntity } from "@domain/entities/motorcycle-try";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";
import { Injectable } from "@nestjs/common";
import { MotorcycleTryMapper } from "../../mappers/motorcycle-try";

@Injectable()
export class MotorcycleTryRepository implements IMotorcycleTryRepository {
	public constructor(private readonly mapper: MotorcycleTryMapper) {}

	public async findById(id: string): Promise<MotorcycleTryEntity | null> {
		const motorcycleTry = await prisma.motorcycleTry.findUnique({
			where: {
				id,
			},
		});
		if (motorcycleTry === null) {
			return null;
		}
		return this.mapper.toDomainEntity(motorcycleTry);
	}

	public async getMotorcyclesInTrial(): Promise<MotorcycleTryEntity[]> {
		const motorcyclesInTrial = await prisma.motorcycleTry.findMany({
			where: {
				startDate: {
					lte: new Date(),
				},
				endDate: {
					gte: new Date(),
				},
			},
		});
		return motorcyclesInTrial.map((motorcycleTry) => this.mapper.toDomainEntity(motorcycleTry));
	}

	public async getMotorcyclesTrialPassed(): Promise<MotorcycleTryEntity[]> {
		const motorcyclesTrialPassed = await prisma.motorcycleTry.findMany({
			where: {
				endDate: {
					lt: new Date(),
				},
			},
		});
		return motorcyclesTrialPassed.map((motorcycleTry) => this.mapper.toDomainEntity(motorcycleTry));
	}

	public async getMotorcyclesTrialComming(): Promise<MotorcycleTryEntity[]> {
		const motorcyclesTrialComming = await prisma.motorcycleTry.findMany({
			where: {
				startDate: {
					gt: new Date(),
				},
			},
		});
		return motorcyclesTrialComming.map((motorcycleTry) => this.mapper.toDomainEntity(motorcycleTry));
	}

	public async getMotorcycleTryByDriverIdAndMotorcycleId(
		driverId: string,
		motorcycleId: MotorcycleLicensePlate,
		startDate: Date,
		endDate: Date,
	): Promise<MotorcycleTryEntity | null> {
		const motorcycleTry = await prisma.motorcycleTry.findFirst({
			where: {
				driverId,
				motorcycleId: motorcycleId.value,
				startDate,
				endDate,
			},
		});

		if (motorcycleTry === null) {
			return null;
		}

		return this.mapper.toDomainEntity(motorcycleTry);
	}

	public async save(motorcycleTry: MotorcycleTryEntity): Promise<void> {
		await prisma.motorcycleTry.create({
			data: {
				id: motorcycleTry.id,
				driverId: motorcycleTry.driverId,
				motorcycleId: motorcycleTry.motorcycleId.value,
				startDate: motorcycleTry.startDate,
				endDate: motorcycleTry.endDate,
			},
		});
	}
}
