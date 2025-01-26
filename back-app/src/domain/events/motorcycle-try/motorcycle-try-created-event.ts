import { type MotorcycleLicensePlate } from "@domain/types/license-plate";
import { type EventGeneric } from "../event-generic";

interface MotorcycleTryCreatedEventData {
	readonly driverId: string;
	readonly motorcycleId: MotorcycleLicensePlate;
	readonly startDate: Date;
	readonly endDate: Date;
}

export type MotorcycleTryCreatedEvent = EventGeneric<"MOTORCYCLE-TRY_CREATED", 1, MotorcycleTryCreatedEventData>;
