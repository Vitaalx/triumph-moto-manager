import { CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { CreateMotorcycleCommand } from "../definitions/create-motorcycle";
import { CreateMotorcycleUsecase } from "@application/usecases/motorcycle/create-motorcycle-usecase";

@CommandHandler(CreateMotorcycleCommand)
export class CreateMotorcycleCommandHandler implements ICommandHandler<
	CreateMotorcycleCommand
> {
	public constructor(
		private readonly createMotorcycle: CreateMotorcycleUsecase,
	) {}

	public execute(command: CreateMotorcycleCommand) {
		return this.createMotorcycle.execute(
			command.licensePlate,
			command.model,
			command.year,
			command.brand,
			command.price,
			command.maintenanceInterval,
			command.mileage,
			command.warrantyEndDate,
		);
	}
}
