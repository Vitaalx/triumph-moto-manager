import { type IMotorcycleMaintenanceRepository } from "@application/ports/repositories/motorcycle-maintenance";
import { MotorcycleMaintenanceNotFoundError } from "@domain/errors/motorcycle-maintenance/motorcycle-maintenance-not-found";

export class GetMotorcycleMaintenanceUsecase {
	public constructor(private readonly motorcycleMaintenanceRepository: IMotorcycleMaintenanceRepository) {}

	public async execute(motorcycleMaintenanceId: string) {
		const motorcycleMaintenance = await this.motorcycleMaintenanceRepository.findById(motorcycleMaintenanceId);

		if (motorcycleMaintenance === null) {
			return new MotorcycleMaintenanceNotFoundError();
		}

		return motorcycleMaintenance;
	}
}
