import { type DriverFullName } from "@domain/types/driver-fullname";
import { type EventGeneric } from "../event-generic";
import { type DriverMotorcycleLicenseType } from "@domain/types/driver-motorcycle-license-type";

interface DriverDeletedEventData {
	readonly fullName: DriverFullName;
	readonly age: number;
	readonly motorcycleLicenseType: DriverMotorcycleLicenseType;
	readonly drivingExperience: string;
}

export type DriverDeletedEvent = EventGeneric<"DRIVER_DELETED", 1, DriverDeletedEventData>;

