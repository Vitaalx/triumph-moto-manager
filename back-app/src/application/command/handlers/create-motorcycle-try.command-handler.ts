import { CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { CreateMotorcycleTryCommand } from "../definitions/create-motorcycle-try";
import { CreateMotorcycleTryUsecase } from "@application/usecases/motorcycle-try/create-motorcycle-try-usecase";

@CommandHandler(CreateMotorcycleTryCommand)
export class CreateMotorcycleTryCommandHandler implements ICommandHandler<
	CreateMotorcycleTryCommand
> {
	public constructor(
		private readonly createMotorcycleTry: CreateMotorcycleTryUsecase,
	) {}

	public execute(command: CreateMotorcycleTryCommand) {
		return this.createMotorcycleTry.execute(
			command.driverId,
			command.motorcycleId,
			command.startDate,
			command.endDate,
		);
	}
}
