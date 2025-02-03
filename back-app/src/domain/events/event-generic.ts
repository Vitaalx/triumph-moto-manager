import { type DriverEvent } from "./driver/driver-event";
import { type MotorcycleIncidentEvent } from "./motorcycle-incident/motorcycle-incident-event";
import { type MotorcycleMaintenanceEvent } from "./motorcycle-maintenance/motorcycle-maintenance-event";
import { type MotorcycleTryEvent } from "./motorcycle-try/motorcycle-try-event";
import { type MotorcycleEvent } from "./motorcycle/motorcycle-event";

export interface EventGeneric<Type, Version, Data> {
	readonly identifier: string;
	readonly type: Type;
	readonly date: Date;
	readonly version: Version;
	readonly data: Data;
}

export type Event =
  | MotorcycleEvent
  | DriverEvent
  | MotorcycleTryEvent
  | MotorcycleIncidentEvent
  | MotorcycleMaintenanceEvent;
