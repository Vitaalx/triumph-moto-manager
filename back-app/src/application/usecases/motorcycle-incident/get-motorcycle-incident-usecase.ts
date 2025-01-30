import { type IMotorcycleIncidentRepository } from "@application/ports/repositories/motorcycle-incident";
import { MotorcycleIncidentNotFoundError } from "@domain/errors/motorcycle-incident/motorcycle-incident-not-found";

export class GetMotorcycleIncidentUsecase {
	public constructor(private readonly motorcycleIncidentRepository: IMotorcycleIncidentRepository) {}

	public async execute(motorcycleIncidentId: string) {
		const motorcycleIncident = await this.motorcycleIncidentRepository.findById(motorcycleIncidentId);

		if (motorcycleIncident === null) {
			return new MotorcycleIncidentNotFoundError();
		}

		return motorcycleIncident;
	}
}
