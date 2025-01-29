import { type IMotorcycleRepository } from "@application/ports/repositories/motorcycle";
import { type MotorcycleEntity } from "@domain/entities/motorcycle";
import { type MotorcycleLicensePlate } from "@domain/types/license-plate";
import { Injectable } from "@nestjs/common";
import { MotorcycleMapper } from "../../mappers/motorcycle";

@Injectable()
export class MotorcycleRepository implements IMotorcycleRepository {
	public constructor(private readonly mapper: MotorcycleMapper) {}

	public async delete(licensePlate: MotorcycleLicensePlate): Promise<void> {
		await prisma.motorcycle.delete({
			where: {
				licensePlate: licensePlate.value,
			},
		});
	}

	public async save(motorcycle: MotorcycleEntity): Promise<void> {
		await prisma.motorcycle.create({
			data: {
				licensePlate: motorcycle.licensePlate.value,
				brand: motorcycle.brand,
				model: motorcycle.model,
				year: motorcycle.year.value,
				price: motorcycle.price.value,
				maintenanceInterval: motorcycle.maintenanceInterval,
			},
		});
	}

	public async updateByLicensePlate(
		licensePlate: MotorcycleLicensePlate,
		motorcycle: MotorcycleEntity,
	): Promise<void> {
		await prisma.motorcycle.update({
			where: {
				licensePlate: licensePlate.value,
			},
			data: {
				brand: motorcycle.brand,
				model: motorcycle.model,
				year: motorcycle.year.value,
				price: motorcycle.price.value,
				maintenanceInterval: motorcycle.maintenanceInterval,
			},
		});
	}

	public async getMotorcycles(): Promise<MotorcycleEntity[]> {
		const motorcycles = await prisma.motorcycle.findMany();
		return motorcycles.map((motorcycle) => this.mapper.toDomainEntity(motorcycle));
	}

	public async findByLicensePlate(licensePlate: MotorcycleLicensePlate): Promise<MotorcycleEntity | null> {
		const motorcycle = await prisma.motorcycle.findUnique({
			where: {
				licensePlate: licensePlate.value,
			},
		});

		if (motorcycle === null) {
			return null;
		}

		return this.mapper.toDomainEntity(motorcycle);
	}
}
