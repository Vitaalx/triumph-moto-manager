import { type EntityMapper } from "./common/entity-mapper";
import { Injectable } from "@nestjs/common";
import { DriverSheetEntity } from "@domain/entities/driver-sheet";
import { DriverMotorcycleLicenseType } from "@domain/types/driver-motorcycle-license-type";
import { DriverFullName } from "@domain/types/driver-fullname";
import { DriverAge } from "@domain/types/driver-age";
import { DriverSheet } from "@prisma/client";
import { Email } from "@domain/types/email";

@Injectable()
export class DriverSheetMapper implements EntityMapper<DriverSheet, DriverSheetEntity> {
	public toDomainEntity(entity: DriverSheet): DriverSheetEntity {
		const fullName = new DriverFullName(entity.fullName);
		const motorcycleLicenseType = new DriverMotorcycleLicenseType(entity.motorcycleLicenseType);
		const age = new DriverAge(entity.age);
		const driverEmail = new Email(entity.email);

		return new DriverSheetEntity(
			entity.id,
			fullName,
			age,
			driverEmail,
			motorcycleLicenseType,
			entity.drivingExperience,
		);
	}
}
