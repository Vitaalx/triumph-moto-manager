import { type MotorcycleCreatedEvent } from "./motorcycle-created-event";
import { type MotorcycleUpdatedEvent } from "./motorcycle-updated-event";

export type MotorcycleEvent = MotorcycleCreatedEvent | MotorcycleUpdatedEvent;
