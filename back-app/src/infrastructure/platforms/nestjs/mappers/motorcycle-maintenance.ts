import { Injectable } from "@nestjs/common";
import { EntityMapper } from "./common/entity-mapper";
import { Prisma } from "@prisma/client";
import { MotorcycleMaintenanceEntity } from "@domain/entities/motorcycle-maintenance";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";
import { MaintenanceSparePart } from "@domain/types/maintenance-spare-part";

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
			entity.usedSpareParts.map((usedSparePart) => new MaintenanceSparePart(
				usedSparePart.id,
				usedSparePart.sparePartId,
				usedSparePart.maintenanceId,
				usedSparePart.quantity,
			)),
			entity.totalSparePartsPrice,
			entity.totalMaintenancePrice,
			entity.laborPrice,
			entity.status,
			entity.date,
		);
	}
}
