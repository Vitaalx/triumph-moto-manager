import { type IMotorcycleRepository } from "@application/ports/repositories/motorcycle";
import { type MotorcycleEntity } from "@domain/entities/motorcycle";
import { type MotorcycleLicensePlate } from "@domain/types/license-plate";
import { Injectable } from "@nestjs/common";
import { MotorcycleMapper } from "../../mappers/motorcycle";

@Injectable()
export class MotorcycleRepository implements IMotorcycleRepository {
	public constructor(private readonly motorcycleMapper: MotorcycleMapper) {}

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

	public getMotorcycles(): Promise<MotorcycleEntity[]> {
		throw new Error("Method not implemented.");
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

		return this.motorcycleMapper.toDomainEntity(motorcycle);
	}
}
