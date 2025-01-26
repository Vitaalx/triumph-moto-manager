import { MotorcycleTry } from "@prisma/client";
import { type EntityMapper } from "./common/entity-mapper";
import { Injectable } from "@nestjs/common";
import { MotorcycleTryEntity } from "@domain/entities/motorcycle-try";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";

@Injectable()
export class MotorcycleTryMapper implements EntityMapper<MotorcycleTry, MotorcycleTryEntity> {
	public toDomainEntity(entity: MotorcycleTry): MotorcycleTryEntity {
		const motorcycleLicensePlate = new MotorcycleLicensePlate(entity.motorcycleId);

		return new MotorcycleTryEntity(
			entity.id,
			entity.driverId,
			motorcycleLicensePlate,
			entity.startDate,
			entity.endDate,
		);
	}
}
