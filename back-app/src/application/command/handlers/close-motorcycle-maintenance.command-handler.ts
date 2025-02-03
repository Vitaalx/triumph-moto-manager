import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CloseMotorcycleMaintenanceCommand } from "../definitions/close-motorcycle-maintenance";
import { CloseMotorcycleMaintenanceUsecase } from "@application/usecases/motorcycle-maintenance/close-motorcycle-maintenance-usecase";

@CommandHandler(CloseMotorcycleMaintenanceCommand)
export class CloseMotorcycleMaintenanceCommandHandler implements ICommandHandler<
	CloseMotorcycleMaintenanceCommand
> {
	public constructor(private readonly closeMotorcycleMaintenance: CloseMotorcycleMaintenanceUsecase) {}

	public execute(command: CloseMotorcycleMaintenanceCommand) {
		return this.closeMotorcycleMaintenance.execute(command.motorcycleMaintenanceId);
	}
}
