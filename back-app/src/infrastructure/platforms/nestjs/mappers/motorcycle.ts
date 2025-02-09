import { type EntityMapper } from "./common/entity-mapper";
import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";
import { MotorcycleYear } from "@domain/types/motorcycle-year";
import { MotorcyclePrice } from "@domain/types/motorcycle-price";
import { MotorcycleEntity } from "@domain/entities/motorcycle";
import { DriverSheetEntity } from "@domain/entities/driver-sheet";
import { DriverFullName } from "@domain/types/driver-fullname";
import { DriverAge } from "@domain/types/driver-age";
import { Email } from "@domain/types/email";
import { DriverMotorcycleLicenseType } from "@domain/types/driver-motorcycle-license-type";

const _motorcycleWithDriver = Prisma.validator<Prisma.MotorcycleDefaultArgs>()({
	include: {
		driverSheet: true,
	},
});

type MotorcycleWithDriver = Prisma.MotorcycleGetPayload<typeof _motorcycleWithDriver>;
@Injectable()
export class MotorcycleMapper implements EntityMapper<MotorcycleWithDriver, MotorcycleEntity> {
	public toDomainEntity(entity: MotorcycleWithDriver): MotorcycleEntity {
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
			entity.mileage,
			entity.warrantyEndDate === null ? undefined : entity.warrantyEndDate,
			entity.driverSheet === null
				? undefined
				: new DriverSheetEntity(
					entity.driverSheet.id,
					new DriverFullName(entity.driverSheet.fullName),
					new DriverAge(entity.driverSheet.age),
					new Email(entity.driverSheet.email),
					new DriverMotorcycleLicenseType(entity.driverSheet.motorcycleLicenseType),
					entity.driverSheet.drivingExperience,
				),
		);
	}
}
