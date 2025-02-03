import { type EventGeneric } from "../event-generic";
import { type MaintenanceStatus } from "@domain/types/maintenance-status";

interface MotorcycleMaintenanceClosingEventData {
	readonly totalSparePartsPrice: number;
	readonly totalMaintenancePrice: number;
	readonly status: MaintenanceStatus;
}

export type MotorcycleMaintenanceClosingEvent = EventGeneric<"MOTORCYCLE-MAINTENANCE_CLOSING", 1, MotorcycleMaintenanceClosingEventData>;
