import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateMotorcycleMaintenanceCommand } from "../definitions/update-motorcycle-maintenance";
import { UpdateMotorcycleMaintenanceUsecase } from "@application/usecases/motorcycle-maintenance/update-motorcycle-maintenance-usecase";

@CommandHandler(UpdateMotorcycleMaintenanceCommand)
export class UpdateMotorcycleMaintenanceCommandHandler implements ICommandHandler<
	UpdateMotorcycleMaintenanceCommand
> {
	public constructor(private readonly updateMotorcycleMaintenance: UpdateMotorcycleMaintenanceUsecase) {}

	public execute(command: UpdateMotorcycleMaintenanceCommand) {
		return this.updateMotorcycleMaintenance.execute(
			command.maintenanceId,
			command.technicalRecommendations,
			command.usedSpareParts,
			command.laborPrice,
		);
	}
}
