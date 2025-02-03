import { type IMotorcycleMaintenanceRepository } from "@application/ports/repositories/motorcycle-maintenance";

export class GetMotorcycleMaintenancesClosedUsecase {
	public constructor(private readonly motorcycleMaintenanceRepository: IMotorcycleMaintenanceRepository) {}

	public async execute() {
		return this.motorcycleMaintenanceRepository.findByStatus("CLOSED");
	}
}
