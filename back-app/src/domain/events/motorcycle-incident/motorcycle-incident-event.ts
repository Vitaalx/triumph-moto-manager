import { type MotorcycleIncidentCreatedEvent } from "./motorcycle-incident-created-event";
import { type MotorcycleIncidentDeletedEvent } from "./motorcycle-incident-deleted-event";

export type MotorcycleIncidentEvent = MotorcycleIncidentCreatedEvent | MotorcycleIncidentDeletedEvent;
