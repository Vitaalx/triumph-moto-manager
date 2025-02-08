import { Injectable } from "@nestjs/common";
import { EntityMapper } from "./common/entity-mapper";
import { Prisma } from "@prisma/client";
import { MotorcycleMaintenanceEntity } from "@domain/entities/motorcycle-maintenance";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";
import { DriverSheetEntity } from "@domain/entities/driver-sheet";
import { DriverFullName } from "@domain/types/driver-fullname";
import { DriverAge } from "@domain/types/driver-age";
import { Email } from "@domain/types/email";
import { DriverMotorcycleLicenseType } from "@domain/types/driver-motorcycle-license-type";

const _motorcycleMaintenanceWithSparePart = Prisma.validator<Prisma.MotorcycleMaintenanceDefaultArgs>()({
	include: {
		usedSpareParts: true,
		driverSheet: true,
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
			new DriverSheetEntity(
				entity.driverSheet.id,
				new DriverFullName(entity.driverSheet.fullName),
				new DriverAge(entity.driverSheet.age),
				new Email(entity.driverSheet.email),
				new DriverMotorcycleLicenseType(entity.driverSheet.motorcycleLicenseType),
				entity.driverSheet.drivingExperience,
			),
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
