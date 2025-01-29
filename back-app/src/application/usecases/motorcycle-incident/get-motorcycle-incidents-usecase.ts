import { type IMotorcycleIncidentRepository } from "@application/ports/repositories/motorcycle-incident";

export class GetMotorcycleIncidentsUsecase {
	public constructor(private readonly motorcycleIncidentRepository: IMotorcycleIncidentRepository) {}

	public async execute() {
		return this.motorcycleIncidentRepository.getMotorcycleIncidents();
	}
}
