import { type PartsOrderSparePartEntity } from "@domain/entities/parts-order-spare-parts";
import { type EventGeneric } from "../event-generic";
import { type NormalizedString } from "@domain/types/string";
import { type PartsOrderStatus } from "@domain/types/parts-order-status";

interface PartsOrderCreatedEventData {
	readonly parts: PartsOrderSparePartEntity[];
	readonly supplierName: NormalizedString;
	readonly totalPrice: number;
	readonly createDate: Date;
	readonly status: PartsOrderStatus;
}

export type PartsOrderCreatedEvent = EventGeneric<"PARTS-ORDER_CREATED", 1, PartsOrderCreatedEventData>;
