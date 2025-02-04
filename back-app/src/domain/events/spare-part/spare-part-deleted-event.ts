import { type EventGeneric } from "../event-generic";

interface SparePartDeletedEventData {
	readonly name: string;
	readonly brand: string;
	readonly refNumber: string;
	readonly stock: number;
	readonly price: number;
}

export type SparePartDeletedEvent = EventGeneric<"SPARE-PART_DELETED", 1, SparePartDeletedEventData>;
