import { type MotorcycleTryCreatedEvent } from "./motorcycle-try-created-event";
import { type MotorcycleTryDeletedEvent } from "./motorcycle-try-deleted-event";
import { type MotorcycleTryUpdatedEvent } from "./motorcycle-try-updated-event";

export type MotorcycleTryEvent = MotorcycleTryCreatedEvent | MotorcycleTryDeletedEvent | MotorcycleTryUpdatedEvent;
