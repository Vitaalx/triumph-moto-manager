import { type PartsOrderStatus } from "@domain/types/parts-order-status";
import { type EventGeneric } from "../event-generic";

interface PartsOrderDeliveredEventData {
	readonly status: PartsOrderStatus;
}

export type PartsOrderDeliveredEvent = EventGeneric<"PARTS-ORDER_DELIVERED", 1, PartsOrderDeliveredEventData>;
