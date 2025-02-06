import { type MotorcycleLicensePlate } from "@domain/types/license-plate";
import { type EventGeneric } from "../event-generic";
import { type MotorcyclePrice } from "@domain/types/motorcycle-price";
import { type MotorcycleYear } from "@domain/types/motorcycle-year";

interface MotorcycleCreatedEventData {
	readonly licensePlate: MotorcycleLicensePlate;
	readonly brand: string;
	readonly model: string;
	readonly year: MotorcycleYear;
	readonly price: MotorcyclePrice;
	readonly maintenanceInterval: string;
	readonly warrantyEndDate?: Date;
}

export type MotorcycleCreatedEvent = EventGeneric<"MOTORCYCLE_CREATED", 1, MotorcycleCreatedEventData>;

