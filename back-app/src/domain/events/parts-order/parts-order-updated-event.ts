import { type PartsOrderSparePartEntity } from "@domain/entities/parts-order-spare-parts";
import { type EventGeneric } from "../event-generic";
import { type NormalizedString } from "@domain/types/string";

interface PartsOrderUpdatedEventData {
	readonly parts: PartsOrderSparePartEntity[];
	readonly supplierName: NormalizedString;
}

export type PartsOrderUpdatedEvent = EventGeneric<"PARTS-ORDER_UPDATED", 1, PartsOrderUpdatedEventData>;
