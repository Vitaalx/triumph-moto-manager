import { GenericEvent } from "./event-generic";

interface MotorcycleCreatedEventData {
	readonly identifier: string;
	readonly licensePlate: string;
	readonly brand: string;
	readonly model: string;
	readonly year: number;
	readonly price: number;
	readonly maintenanceInterval: string;
}

export class MotorcycleCreatedEvent extends GenericEvent<"MOTORCYCLE_CREATE", MotorcycleCreatedEventData["identifier"], MotorcycleCreatedEventData> {
	public constructor(eventData: MotorcycleCreatedEventData) {
		super("MOTORCYCLE_CREATE", eventData.identifier, { ...eventData });
	}
}
