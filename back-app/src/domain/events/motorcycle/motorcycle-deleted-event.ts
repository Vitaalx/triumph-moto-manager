import { type MotorcycleYear } from "@domain/types/motorcycle-year";
import { type EventGeneric } from "../event-generic";
import { type MotorcyclePrice } from "@domain/types/motorcycle-price";

interface MotorcycleDeletedEventData {
	readonly licensePlate: string;
	readonly brand: string;
	readonly model: string;
	readonly year: MotorcycleYear;
	readonly price: MotorcyclePrice;
	readonly maintenanceInterval: string;
}

export type MotorcycleDeletedEvent = EventGeneric<"MOTORCYCLE_DELETED", 1, MotorcycleDeletedEventData>;

