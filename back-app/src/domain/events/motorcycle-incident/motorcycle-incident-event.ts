import { type MotorcycleIncidentCreatedEvent } from "./motorcycle-incident-created-event";
import { type MotorcycleIncidentUpdatedEvent } from "./motorcycle-incident-updated-event";

export type MotorcycleIncidentEvent = MotorcycleIncidentCreatedEvent | MotorcycleIncidentUpdatedEvent;
