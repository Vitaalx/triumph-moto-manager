import { type MotorcycleCreatedEvent } from "./motorcycle-created-event";
import { type MotorcycleDeletedEvent } from "./motorcycle-deleted-event";

export type MotorcycleEvent = MotorcycleCreatedEvent | MotorcycleDeletedEvent;
