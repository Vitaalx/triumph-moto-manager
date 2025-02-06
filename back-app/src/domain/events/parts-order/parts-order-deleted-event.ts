import { type PartsOrderSparePartEntity } from "@domain/entities/parts-order-spare-parts";
import { type EventGeneric } from "../event-generic";
import { type NormalizedString } from "@domain/types/string";
import { type PartsOrderStatus } from "@domain/types/parts-order-status";

interface PartsOrderDeletedEventData {
	readonly parts: PartsOrderSparePartEntity[];
	readonly supplierName: NormalizedString;
	readonly totalPrice: number;
	readonly createDate: Date;
	readonly status: PartsOrderStatus;
}

export type PartsOrderDeletedEvent = EventGeneric<"PARTS-ORDER_DELETED", 1, PartsOrderDeletedEventData>;
