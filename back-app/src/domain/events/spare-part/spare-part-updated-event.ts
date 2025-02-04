import { type EventGeneric } from "../event-generic";

interface SparePartUpdatedEventData {
	readonly name: string;
	readonly brand: string;
	readonly stock: number;
	readonly price: number;
}

export type SparePartUpdatedEvent = EventGeneric<"SPARE-PART_UPDATED", 1, SparePartUpdatedEventData>;
