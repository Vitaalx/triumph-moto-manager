import { type PartsOrderCreatedEvent } from "./parts-order-created-event";
import { type PartsOrderDeletedEvent } from "./parts-order-deleted-event";
import { type PartsOrderDeliveredEvent } from "./parts-order-delivered-event";
import { type PartsOrderUpdatedEvent } from "./parts-order-updated-event";

export type PartsOrderEvent =
  PartsOrderCreatedEvent |
  PartsOrderDeletedEvent |
  PartsOrderDeliveredEvent |
  PartsOrderUpdatedEvent;
