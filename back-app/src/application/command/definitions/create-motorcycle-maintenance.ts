import { type CreateMotorcycleMaintenanceUsecase } from "@application/usecases/motorcycle-maintenance/create-motorcycle-maintenance-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class CreateMotorcycleMaintenanceCommand extends Command<ReturnType<CreateMotorcycleMaintenanceUsecase["execute"]>> {
	public constructor(
		public readonly driverId: string,
		public readonly motorcycleId: string,
	) {
		super();
	}
}
