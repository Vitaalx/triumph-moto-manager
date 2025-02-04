import { type EventGeneric } from "../event-generic";

interface SparePartCreatedEventData {
	readonly name: string;
	readonly brand: string;
	readonly refNumber: string;
	readonly stock: number;
	readonly price: number;
}

export type SparePartCreatedEvent = EventGeneric<"SPARE-PART_CREATED", 1, SparePartCreatedEventData>;
