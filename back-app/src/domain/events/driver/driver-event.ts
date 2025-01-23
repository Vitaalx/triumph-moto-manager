import { type DriverCreatedEvent } from "./driver-created-event";
import { type DriverDeletedEvent } from "./driver-deleted-event";
import { type DriverUpdatedEvent } from "./driver-updated-event";

export type DriverEvent = DriverCreatedEvent | DriverUpdatedEvent | DriverDeletedEvent;
