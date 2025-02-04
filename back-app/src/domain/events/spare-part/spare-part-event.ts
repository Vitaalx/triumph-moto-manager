import { type SparePartCreatedEvent } from "./spare-part-created-event";
import { type SparePartDeletedEvent } from "./spare-part-deleted-event";
import { type SparePartUpdatedEvent } from "./spare-part-updated-event";

export type SparePartEvent =
  SparePartCreatedEvent |
  SparePartDeletedEvent |
  SparePartUpdatedEvent;
