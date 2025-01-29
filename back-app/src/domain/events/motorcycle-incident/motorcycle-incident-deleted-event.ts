import { type EventGeneric } from "../event-generic";

interface MotorcycleIncidentDeletedEventData {
	readonly type: string;
	readonly description: string;
	readonly motorcycleId: string;
	readonly driverId: string;
	readonly incidentDate: Date;
	readonly incidentTime: string;
	readonly location: string;
}

export type MotorcycleIncidentDeletedEvent = EventGeneric<"MOTORCYCLE-INCIDENT_DELETED", 1, MotorcycleIncidentDeletedEventData>;
