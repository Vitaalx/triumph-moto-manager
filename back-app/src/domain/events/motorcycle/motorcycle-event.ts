import { type MotorcycleCreatedEvent } from "./motorcycle-created-event";
import { type MotorcycleDeletedEvent } from "./motorcycle-deleted-event";
import { type MotorcycleUpdatedEvent } from "./motorcycle-updated-event";

export type MotorcycleEvent = MotorcycleCreatedEvent | MotorcycleDeletedEvent | MotorcycleUpdatedEvent;
