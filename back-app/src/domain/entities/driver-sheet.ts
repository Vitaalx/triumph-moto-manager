import { DriverFullName } from "@domain/types/driver-fullname";
import { DriverAge } from "@domain/types/driver-age";
import { DriverMotorcycleLicenseType } from "@domain/types/driver-motorcycle-license-type";
import { InvalidDriverAgeError } from "@domain/errors/driver/invalid-driver-age";
import { InvalidDriverMotorcycleLicenseTypeError } from "@domain/errors/driver/invalid-driver-motorcycle-license-type";
import { randomUUID } from "crypto";
import { type MotorcycleTryEntity } from "./motorcycle-try";
import { type MotorcycleIncidentEntity } from "./motorcycle-incident";
import { type MotorcycleEntity } from "./motorcycle";
import { Email } from "@domain/types/email";
import { InvalidEmailError } from "@domain/errors/invalid-email-error";

export class DriverSheetEntity {
	public constructor(
		public id: string,
		public fullName: DriverFullName,
		public age: DriverAge,
		public email: Email,
		public motorcycleLicenseType: DriverMotorcycleLicenseType,
		public drivingExperience: string,
		public motorcycles: MotorcycleEntity[] = [],
		public motorcycleTries: MotorcycleTryEntity[] = [],
		public incidents: MotorcycleIncidentEntity[] = [],
	) {}

	public static from(
		name: string,
		firstname: string,
		email: string,
		age: number,
		motorcycleLicenseType: string,
		drivingExperience: string,
	) {
		const driverFullName = DriverFullName.from(firstname, name);

		if (driverFullName instanceof Error) {
			return driverFullName;
		}

		const driverMotorcycleLicenseType = DriverMotorcycleLicenseType.from(motorcycleLicenseType);

		if (driverMotorcycleLicenseType instanceof InvalidDriverMotorcycleLicenseTypeError) {
			return driverMotorcycleLicenseType;
		}

		const driverAge = DriverAge.from(age, driverMotorcycleLicenseType);

		if (driverAge instanceof InvalidDriverAgeError) {
			return driverAge;
		}

		const driverEmail = Email.from(email);

		if (driverEmail instanceof InvalidEmailError) {
			return driverEmail;
		}

		return new DriverSheetEntity(
			randomUUID(),
			driverFullName,
			driverAge,
			driverEmail,
			driverMotorcycleLicenseType,
			drivingExperience,
		);
	}
}
