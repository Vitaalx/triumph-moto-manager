import { type EventGeneric } from "../event-generic";

interface MotorcycleCreatedEventData {
	readonly licensePlate: string;
	readonly brand: string;
	readonly model: string;
	readonly year: number;
	readonly price: number;
	readonly maintenanceInterval: string;
}

export type MotorcycleCreatedEvent = EventGeneric<"MOTORCYCLE_CREATED", 1, MotorcycleCreatedEventData>;

