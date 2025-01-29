import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type IMotorcycleIncidentRepository } from "@application/ports/repositories/motorcycle-incident";
import { MotorcycleIncidentNotFoundError } from "@domain/errors/motorcycle-incident/motorcycle-incident-not-found";
import { type MotorcycleIncidentUpdatedEvent } from "@domain/events/motorcycle-incident/motorcycle-incident-updated-event";
import { IncidentType } from "@domain/types/incident-type";

export class UpdateMotorcycleIncidentUsecase {
	public constructor(
		private readonly motorcycleIncidentRepository: IMotorcycleIncidentRepository,
		private readonly eventStoreRepository: IEventStoreRepository,
	) {}

	public async execute(
		motorcycleIncidentId: string,
		type: string,
		description: string,
		incidentDate: Date,
		incidentTime: string,
		location: string,
	) {
		const motorcycleIncidentType = IncidentType.from(type);

		if (motorcycleIncidentType instanceof Error) {
			return motorcycleIncidentType;
		}

		const motorcycleIncident = await this.motorcycleIncidentRepository.findById(motorcycleIncidentId);

		if (motorcycleIncident === null) {
			return new MotorcycleIncidentNotFoundError();
		}

		motorcycleIncident.type = motorcycleIncidentType;
		motorcycleIncident.description = description;
		motorcycleIncident.incidentDate = incidentDate;
		motorcycleIncident.incidentTime = incidentTime;
		motorcycleIncident.location = location;

		const event: MotorcycleIncidentUpdatedEvent = {
			date: new Date(),
			identifier: motorcycleIncident.id,
			type: "MOTORCYCLE-INCIDENT_UPDATED",
			version: 1,
			data: {
				type: motorcycleIncident.type.value,
				description: motorcycleIncident.description,
				incidentDate: motorcycleIncident.incidentDate,
				incidentTime: motorcycleIncident.incidentTime,
				location: motorcycleIncident.location,
			},
		};

		await this.eventStoreRepository.publish(event);

		return this.motorcycleIncidentRepository.update(motorcycleIncident.id, motorcycleIncident);
	}
}
