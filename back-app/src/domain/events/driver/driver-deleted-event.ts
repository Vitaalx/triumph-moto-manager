import { type EventGeneric } from "../event-generic";

interface DriverDeletedEventData {
	readonly fullName: string;
	readonly age: number;
	readonly motorcycleLicenseType: string;
	readonly drivingExperience: string;
}

export type DriverDeletedEvent = EventGeneric<"DRIVER_DELETED", 1, DriverDeletedEventData>;

