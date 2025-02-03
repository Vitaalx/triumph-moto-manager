import { type IMotorcycleMaintenanceRepository } from "@application/ports/repositories/motorcycle-maintenance";

export class GetMotorcycleMaintenancesInProgressUsecase {
	public constructor(private readonly motorcycleMaintenanceRepository: IMotorcycleMaintenanceRepository) {}

	public async execute() {
		return this.motorcycleMaintenanceRepository.findByStatus("IN_PROGRESS");
	}
}
