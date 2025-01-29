import { type MotorcycleIncidentCreatedEvent } from "./motorcycle-incident-created-event";
import { type MotorcycleIncidentDeletedEvent } from "./motorcycle-incident-deleted-event";
import { type MotorcycleIncidentUpdatedEvent } from "./motorcycle-incident-updated-event";

export type MotorcycleIncidentEvent =
  MotorcycleIncidentCreatedEvent |
  MotorcycleIncidentDeletedEvent |
  MotorcycleIncidentUpdatedEvent;
