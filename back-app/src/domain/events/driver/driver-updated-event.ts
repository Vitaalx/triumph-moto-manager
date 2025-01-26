import { type Email } from "@domain/types/email";
import { type EventGeneric } from "../event-generic";
import { type DriverMotorcycleLicenseType } from "@domain/types/driver-motorcycle-license-type";

interface DriverUpdatedEventData {
	readonly email: Email;
	readonly age: number;
	readonly motorcycleLicenseType: DriverMotorcycleLicenseType;
	readonly drivingExperience: string;
}

export type DriverUpdatedEvent = EventGeneric<"DRIVER_UPDATED", 1, DriverUpdatedEventData>;

