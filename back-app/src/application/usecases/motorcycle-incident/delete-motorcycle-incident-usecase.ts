import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type IMotorcycleIncidentRepository } from "@application/ports/repositories/motorcycle-incident";
import { MotorcycleIncidentNotFoundError } from "@domain/errors/motorcycle-incident/motorcycle-incident-not-found";
import { type MotorcycleIncidentDeletedEvent } from "@domain/events/motorcycle-incident/motorcycle-incident-deleted-event";

export class DeleteMotorcycleIncidentUsecase {
	public constructor(
		private readonly motorcycleIncidentRepository: IMotorcycleIncidentRepository,
		private readonly eventStoreRepository: IEventStoreRepository,
	) {}

	public async execute(motorcycleIncidentId: string) {
		const motorcycleIncident = await this.motorcycleIncidentRepository.findById(motorcycleIncidentId);

		if (motorcycleIncident === null) {
			return new MotorcycleIncidentNotFoundError();
		}

		const event: MotorcycleIncidentDeletedEvent = {
			date: new Date(),
			identifier: motorcycleIncident.id,
			type: "MOTORCYCLE-INCIDENT_DELETED",
			version: 1,
			data: {
				type: motorcycleIncident.type.value,
				description: motorcycleIncident.description,
				motorcycleId: motorcycleIncident.motorcycleId.value,
				driverId: motorcycleIncident.driverId,
				incidentDate: motorcycleIncident.incidentDate,
				incidentTime: motorcycleIncident.incidentTime,
				location: motorcycleIncident.location,
			},
		};

		await this.eventStoreRepository.publish(event);

		return this.motorcycleIncidentRepository.delete(motorcycleIncident);
	}
}
