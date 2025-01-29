import { type EventGeneric } from "../event-generic";

interface MotorcycleIncidentCreatedEventData {
	readonly type: string;
	readonly description: string;
	readonly motorcycleId: string;
	readonly driverId: string;
	readonly incidentDate: Date;
	readonly incidentTime: string;
	readonly location: string;
}

export type MotorcycleIncidentCreatedEvent = EventGeneric<"MOTORCYCLE-INCIDENT_CREATED", 1, MotorcycleIncidentCreatedEventData>;
