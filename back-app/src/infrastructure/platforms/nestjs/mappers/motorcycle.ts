import { type EntityMapper } from "./common/entity-mapper";
import { type Motorcycle } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";
import { MotorcycleYear } from "@domain/types/motorcycle-year";
import { MotorcyclePrice } from "@domain/types/motorcycle-price";
import { MotorcycleEntity } from "@domain/entities/motorcycle";

@Injectable()
export class MotorcycleMapper implements EntityMapper<Motorcycle, MotorcycleEntity> {
	public toDomainEntity(entity: Motorcycle): MotorcycleEntity {
		const motorcycleLicensePlate = new MotorcycleLicensePlate(entity.licensePlate);
		const motorcycleYear = new MotorcycleYear(entity.year);
		const motorcyclePrice = new MotorcyclePrice(entity.price);

		return new MotorcycleEntity(
			motorcycleLicensePlate,
			entity.brand,
			entity.model,
			motorcycleYear,
			motorcyclePrice,
			entity.maintenanceInterval,
			entity.warrantyEndDate === null ? undefined : entity.warrantyEndDate,
			entity.driverId === null ? undefined : entity.driverId,
		);
	}
}
