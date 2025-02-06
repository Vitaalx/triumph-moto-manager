import { Injectable } from "@nestjs/common";
import { EntityMapper } from "./common/entity-mapper";
import { Prisma } from "@prisma/client";
import { MotorcycleMaintenanceEntity } from "@domain/entities/motorcycle-maintenance";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";

const _motorcycleMaintenanceWithSparePart = Prisma.validator<Prisma.MotorcycleMaintenanceDefaultArgs>()({
	include: {
		usedSpareParts: true,
	},
});

type MotorcycleMaintenanceWithSparePart = Prisma.MotorcycleMaintenanceGetPayload<
	typeof _motorcycleMaintenanceWithSparePart
>;
@Injectable()
export class MotorcycleMaintenanceMapper implements EntityMapper<
	MotorcycleMaintenanceWithSparePart,
	MotorcycleMaintenanceEntity
> {
	public toDomainEntity(entity: MotorcycleMaintenanceWithSparePart): MotorcycleMaintenanceEntity {
		return new MotorcycleMaintenanceEntity(
			entity.id,
			entity.driverId,
			new MotorcycleLicensePlate(entity.motorcycleId),
			entity.technicalRecommendations,
			entity.usedSpareParts,
			entity.totalSparePartsPrice,
			entity.totalMaintenancePrice,
			entity.laborPrice,
			entity.status,
			entity.date,
		);
	}
}
