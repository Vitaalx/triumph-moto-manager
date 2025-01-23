import { type EventGeneric } from "../event-generic";

interface DriverUpdatedEventData {
	readonly email: string;
	readonly age: number;
	readonly motorcycleLicenseType: string;
	readonly drivingExperience: string;
}

export type DriverUpdatedEvent = EventGeneric<"DRIVER_UPDATED", 1, DriverUpdatedEventData>;

