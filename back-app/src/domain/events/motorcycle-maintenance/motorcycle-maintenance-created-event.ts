import { type MotorcycleLicensePlate } from "@domain/types/license-plate";
import { type EventGeneric } from "../event-generic";

interface MotorcycleMaintenanceCreatedEventData {
	readonly driverId: string;
	readonly motorcycleId: MotorcycleLicensePlate;
}

export type MotorcycleMaintenanceCreatedEvent = EventGeneric<"MOTORCYCLE-MAINTENANCE_CREATED", 1, MotorcycleMaintenanceCreatedEventData>;
