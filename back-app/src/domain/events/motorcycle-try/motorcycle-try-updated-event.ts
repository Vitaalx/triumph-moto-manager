import { type MotorcycleLicensePlate } from "@domain/types/license-plate";
import { type EventGeneric } from "../event-generic";

interface MotorcycleTryUpdatedEventData {
	readonly driverId: string;
	readonly motorcycleId: MotorcycleLicensePlate;
	readonly startDate: Date;
	readonly endDate: Date;
}

export type MotorcycleTryUpdatedEvent = EventGeneric<"MOTORCYCLE-TRY_UPDATED", 1, MotorcycleTryUpdatedEventData>;
