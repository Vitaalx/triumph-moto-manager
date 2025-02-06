import { type MotorcycleTryCreatedEvent } from "./motorcycle-try-created-event";
import { type MotorcycleTryUpdatedEvent } from "./motorcycle-try-updated-event";

export type MotorcycleTryEvent = MotorcycleTryCreatedEvent | MotorcycleTryUpdatedEvent;
