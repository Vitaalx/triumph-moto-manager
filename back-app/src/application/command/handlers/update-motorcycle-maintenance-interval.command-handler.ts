import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateMotorcycleMaintenanceIntervalCommand } from "../definitions/update-motorcycle-maintenance-interval-command";
import { UpdateMotorcycleMaintenanceIntervalUsecase } from "@application/usecases/motorcycle/update-motorcycle-maintenance-interval-usecase";

@CommandHandler(UpdateMotorcycleMaintenanceIntervalCommand)
export class UpdateMotorcycleMaintenanceIntervalCommandHandler implements ICommandHandler<
	UpdateMotorcycleMaintenanceIntervalCommand
> {
	public constructor(
		private readonly updateMotorcycleMaintenanceInterval: UpdateMotorcycleMaintenanceIntervalUsecase,
	) {}

	public async execute(
		command: UpdateMotorcycleMaintenanceIntervalCommand,
	) {
		return this.updateMotorcycleMaintenanceInterval.execute(command.licensePlate, command.maintenanceInterval);
	}
}
