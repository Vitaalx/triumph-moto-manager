import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateMotorcycleCommand } from "../definitions/update-motorcycle";
import { UpdateMotorcycleUsecase } from "@application/usecases/motorcycle/update-motorcycle-usecase";

@CommandHandler(UpdateMotorcycleCommand)
export class UpdateMotorcycleCommandHandler implements ICommandHandler<
	UpdateMotorcycleCommand
> {
	public constructor(
		private readonly updateMotorcycle: UpdateMotorcycleUsecase,
	) {}

	public async execute(
		command: UpdateMotorcycleCommand,
	) {
		return this.updateMotorcycle.execute(
			command.licensePlate,
			command.model,
			command.year,
			command.brand,
			command.price,
			command.maintenanceInterval,
		);
	}
}
