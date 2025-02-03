import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateMotorcycleMaintenanceCommand } from "../definitions/create-motorcycle-maintenance";
import { CreateMotorcycleMaintenanceUsecase } from "@application/usecases/motorcycle-maintenance/create-motorcycle-maintenance-usecase";

@CommandHandler(CreateMotorcycleMaintenanceCommand)
export class CreateMotorcycleMaintenanceCommandHandler implements ICommandHandler<
	CreateMotorcycleMaintenanceCommand
> {
	public constructor(private readonly createMotorcycleMaintenance: CreateMotorcycleMaintenanceUsecase) {}

	public execute(command: CreateMotorcycleMaintenanceCommand) {
		return this.createMotorcycleMaintenance.execute(command.driverId, command.motorcycleId);
	}
}
