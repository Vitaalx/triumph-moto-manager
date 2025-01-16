import { type EventGeneric } from "../event-generic";

interface MotorcycleDeletedEventData {
	readonly licensePlate: string;
	readonly brand: string;
	readonly model: string;
	readonly year: number;
	readonly price: number;
	readonly maintenanceInterval: string;
}

export type MotorcycleDeletedEvent = EventGeneric<"MOTORCYCLE_DELETED", 1, MotorcycleDeletedEventData>;

