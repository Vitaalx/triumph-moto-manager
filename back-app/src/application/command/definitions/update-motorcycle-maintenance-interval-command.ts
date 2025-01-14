import { type UpdateMotorcycleMaintenanceIntervalUsecase } from "@application/usecases/motorcycle/update-motorcycle-maintenance-interval-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class UpdateMotorcycleMaintenanceIntervalCommand extends Command<ReturnType<UpdateMotorcycleMaintenanceIntervalUsecase["execute"]>> {
	public constructor(
		public readonly licensePlate: string,
		public readonly maintenanceInterval: string,
	) {
		super();
	}
}
