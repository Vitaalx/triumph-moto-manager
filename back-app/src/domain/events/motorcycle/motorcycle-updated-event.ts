import { type EventGeneric } from "../event-generic";

interface MotorcycleUpdatedEventData {
	readonly brand: string;
	readonly model: string;
	readonly year: number;
	readonly price: number;
	readonly maintenanceInterval: string;
}

export type MotorcycleUpdatedEvent = EventGeneric<"MOTORCYCLE_UPDATED", 1, MotorcycleUpdatedEventData>;

