import { type IDriverRepository } from "@application/ports/repositories/driver";
import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type IMotorcycleRepository } from "@application/ports/repositories/motorcycle";
import { type IMotorcycleIncidentRepository } from "@application/ports/repositories/motorcycle-incident";
import { MotorcycleIncidentEntity } from "@domain/entities/motorcycle-incident";
import { DriverNotFoundError } from "@domain/errors/driver/driver-not-found";
import { MotorcycleIncidentAlreadyExistsError } from "@domain/errors/motorcycle-incident/motorcycle-incident-already-exists";
import { MotorcycleNotFoundError } from "@domain/errors/motorcycle/motorcycle-not-found";
import { type MotorcycleIncidentCreatedEvent } from "@domain/events/motorcycle-incident/motorcycle-incident-created-event";

export class CreateMotorcycleIncidentUsecase {
	public constructor(
		private readonly motorcycleIncidentRepository: IMotorcycleIncidentRepository,
		private readonly motorcycleRepository: IMotorcycleRepository,
		private readonly driverRepository: IDriverRepository,
		private readonly eventStoreRepository: IEventStoreRepository,
	) {}

	public async execute(
		type: string,
		description: string,
		motorcycleId: string,
		driverId: string,
		incidentDate: Date,
		incidentTime: string,
		location: string,
	) {
		const motorcycleIncident = MotorcycleIncidentEntity.from(
			type,
			description,
			motorcycleId,
			driverId,
			incidentDate,
			incidentTime,
			location,
		);

		if (motorcycleIncident instanceof Error) {
			return motorcycleIncident;
		}

		const motorcycle = await this.motorcycleRepository.findByLicensePlate(motorcycleIncident.motorcycleId);

		if (motorcycle === null) {
			return new MotorcycleNotFoundError();
		}

		const driver = await this.driverRepository.findById(driverId);

		if (driver === null) {
			return new DriverNotFoundError();
		}

		const motorcycleIncidentExists = await this.motorcycleIncidentRepository.findByLicensePlate(
			motorcycleIncident.motorcycleId,
		);

		if (motorcycleIncidentExists) {
			return new MotorcycleIncidentAlreadyExistsError();
		}

		const event: MotorcycleIncidentCreatedEvent = {
			date: new Date(),
			identifier: motorcycleIncident.motorcycleId.value,
			type: "MOTORCYCLE-INCIDENT_CREATED",
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

		return this.motorcycleIncidentRepository.save(motorcycleIncident);
	}
}
