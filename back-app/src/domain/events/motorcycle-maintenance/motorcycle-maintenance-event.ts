import { type MotorcycleMaintenanceClosingEvent } from "./motorcycle-maintenance-closing-event";
import { type MotorcycleMaintenanceCreatedEvent } from "./motorcycle-maintenance-created-event";
import { type MotorcycleMaintenanceUpdatedEvent } from "./motorcycle-maintenance-updated-event";

export type MotorcycleMaintenanceEvent =
  MotorcycleMaintenanceCreatedEvent |
  MotorcycleMaintenanceUpdatedEvent |
  MotorcycleMaintenanceClosingEvent;
