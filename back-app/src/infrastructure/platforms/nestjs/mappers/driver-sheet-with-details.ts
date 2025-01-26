import { type EntityMapper } from "./common/entity-mapper";
import { Injectable } from "@nestjs/common";
import { DriverSheetEntity } from "@domain/entities/driver-sheet";
import { DriverMotorcycleLicenseType } from "@domain/types/driver-motorcycle-license-type";
import { DriverFullName } from "@domain/types/driver-fullname";
import { DriverAge } from "@domain/types/driver-age";
import { Prisma } from "@prisma/client";
import { MotorcycleEntity } from "@domain/entities/motorcycle";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";
import { MotorcyclePrice } from "@domain/types/motorcycle-price";
import { MotorcycleYear } from "@domain/types/motorcycle-year";
import { MotorcycleTryEntity } from "@domain/entities/motorcycle-try";
import { MotorcycleIncidentEntity } from "@domain/entities/motorcycle-incident";
import { Email } from "@domain/types/email";

const _driverSheetWithDetails = Prisma.validator<Prisma.DriverSheetDefaultArgs>()({
	include: {
		motorcycles: true,
		motorcycleTries: true,
		motorcycleIncidents: true,
	},
});

type DriverSheetWithDetails = Prisma.DriverSheetGetPayload<typeof _driverSheetWithDetails>;

@Injectable()
export class DriverSheetWithDetailsMapper implements EntityMapper<DriverSheetWithDetails, DriverSheetEntity> {
	public toDomainEntity(entity: DriverSheetWithDetails): DriverSheetEntity {
		const fullName = new DriverFullName(entity.fullName);
		const motorcycleLicenseType = new DriverMotorcycleLicenseType(entity.motorcycleLicenseType);
		const driverEmail = new Email(entity.email);
		const age = new DriverAge(entity.age);

		const motorcycles = entity.motorcycles.map((motorcycle) => new MotorcycleEntity(
			new MotorcycleLicensePlate(motorcycle.licensePlate),
			motorcycle.brand,
			motorcycle.model,
			new MotorcyclePrice(motorcycle.price),
			new MotorcycleYear(motorcycle.year),
			motorcycle.maintenanceInterval,
		));

		const motorcyclesTries = entity.motorcycleTries.map((motorcycleTry) => new MotorcycleTryEntity(
			motorcycleTry.id,
			motorcycleTry.driverId,
			new MotorcycleLicensePlate(motorcycleTry.motorcycleId),
			motorcycleTry.startDate,
			motorcycleTry.endDate,
		));

		const motorcycleIncidents = entity.motorcycleIncidents.map((incident) => new MotorcycleIncidentEntity(
			incident.id,
			incident.description,
			incident.motorcycleId,
			incident.driverId,
		));

		return new DriverSheetEntity(
			entity.id,
			fullName,
			age,
			driverEmail,
			motorcycleLicenseType,
			entity.drivingExperience,
			motorcycles,
			motorcyclesTries,
			motorcycleIncidents,
		);
	}
}
