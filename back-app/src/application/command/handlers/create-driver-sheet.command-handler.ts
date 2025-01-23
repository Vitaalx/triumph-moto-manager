import { CreateDriverUsecase } from "@application/usecases/driver/create-driver-usecase";
import { CreateDriverSheetCommand } from "../definitions/create-driver-sheet";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

@CommandHandler(CreateDriverSheetCommand)
export class CreateDriverSheetCommandHandler implements ICommandHandler<
	CreateDriverSheetCommand
> {
	public constructor(
		private readonly createDriver: CreateDriverUsecase,
	) {}

	public async execute(command: CreateDriverSheetCommand) {
		return this.createDriver.execute(
			command.name,
			command.firstname,
			command.age,
			command.email,
			command.motorcycleLicenseType,
			command.drivingExperience,
		);
	}
}
