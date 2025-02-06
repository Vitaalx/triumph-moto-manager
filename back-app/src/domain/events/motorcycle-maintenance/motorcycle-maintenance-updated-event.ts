import { type EventGeneric } from "../event-generic";
import { type MaintenanceSparePartEntity } from "@domain/entities/maintenance-spare-part";

interface MotorcycleMaintenanceUpdatedEventData {
	readonly technicalRecommendations: string;
	readonly usedSpareParts: MaintenanceSparePartEntity[];
	readonly laborPrice: number;
}

export type MotorcycleMaintenanceUpdatedEvent = EventGeneric<"MOTORCYCLE-MAINTENANCE_UPDATED", 1, MotorcycleMaintenanceUpdatedEventData>;
