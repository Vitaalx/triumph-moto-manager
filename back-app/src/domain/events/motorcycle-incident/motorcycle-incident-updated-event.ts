import { type EventGeneric } from "../event-generic";

interface MotorcycleIncidentUpdatedEventData {
	readonly type: string;
	readonly description: string;
	readonly incidentDate: Date;
	readonly incidentTime: string;
	readonly location: string;
}

export type MotorcycleIncidentUpdatedEvent = EventGeneric<"MOTORCYCLE-INCIDENT_UPDATED", 1, MotorcycleIncidentUpdatedEventData>;
