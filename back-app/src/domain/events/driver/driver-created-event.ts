import { type DriverMotorcycleLicenseType } from "@domain/types/driver-motorcycle-license-type";
import { type EventGeneric } from "../event-generic";
import { type Email } from "@domain/types/email";
import { type DriverFullName } from "@domain/types/driver-fullname";

interface DriverCreatedEventData {
	readonly fullName: DriverFullName;
	readonly age: number;
	readonly email: Email;
	readonly motorcycleLicenseType: DriverMotorcycleLicenseType;
	readonly drivingExperience: string;
}

export type DriverCreatedEvent = EventGeneric<"DRIVER_CREATED", 1, DriverCreatedEventData>;

