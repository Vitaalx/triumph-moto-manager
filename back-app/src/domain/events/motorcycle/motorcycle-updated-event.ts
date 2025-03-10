import { type MotorcycleYear } from "@domain/types/motorcycle-year";
import { type EventGeneric } from "../event-generic";
import { type MotorcyclePrice } from "@domain/types/motorcycle-price";

interface MotorcycleUpdatedEventData {
	readonly brand: string;
	readonly model: string;
	readonly year: MotorcycleYear;
	readonly price: MotorcyclePrice;
	readonly maintenanceInterval: number;
	readonly mileage: number;
	readonly warrantyEndDate?: Date;
}

export type MotorcycleUpdatedEvent = EventGeneric<"MOTORCYCLE_UPDATED", 1, MotorcycleUpdatedEventData>;

