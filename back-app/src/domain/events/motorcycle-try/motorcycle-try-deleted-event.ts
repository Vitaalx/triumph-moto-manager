import { type MotorcycleLicensePlate } from "@domain/types/license-plate";
import { type EventGeneric } from "../event-generic";

interface MotorcycleTryDeletedEventData {
	readonly driverId: string;
	readonly motorcycleId: MotorcycleLicensePlate;
	readonly startDate: Date;
	readonly endDate: Date;
}

export type MotorcycleTryDeletedEvent = EventGeneric<"MOTORCYCLE-TRY_DELETED", 1, MotorcycleTryDeletedEventData>;
