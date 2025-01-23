import { type EventGeneric } from "../event-generic";

interface DriverCreatedEventData {
	readonly name: string;
	readonly firstname: string;
	readonly age: number;
	readonly email: string;
	readonly motorcycleLicenseType: string;
	readonly drivingExperience: string;
}

export type DriverCreatedEvent = EventGeneric<"DRIVER_CREATED", 1, DriverCreatedEventData>;

