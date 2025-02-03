import { type CloseMotorcycleMaintenanceUsecase } from "@application/usecases/motorcycle-maintenance/close-motorcycle-maintenance-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class CloseMotorcycleMaintenanceCommand extends Command<ReturnType<CloseMotorcycleMaintenanceUsecase["execute"]>> {
	public constructor(
		public readonly motorcycleMaintenanceId: string,
	) {
		super();
	}
}
