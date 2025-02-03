import { type EventGeneric } from "../event-generic";
import { type MaintenanceSparePart } from "@domain/types/maintenance-spare-part";

interface MotorcycleMaintenanceUpdatedEventData {
	readonly technicalRecommendations: string;
	readonly usedSpareParts: MaintenanceSparePart[];
	readonly laborPrice: number;
}

export type MotorcycleMaintenanceUpdatedEvent = EventGeneric<"MOTORCYCLE-MAINTENANCE_UPDATED", 1, MotorcycleMaintenanceUpdatedEventData>;
