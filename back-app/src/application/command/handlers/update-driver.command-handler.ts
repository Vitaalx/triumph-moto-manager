import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateDriverCommand } from "../definitions/update-driver";
import { UpdateDriverUsecase } from "@application/usecases/driver/update-driver-usecase";

@CommandHandler(UpdateDriverCommand)
export class UpdateDriverCommandHandler implements ICommandHandler<
	UpdateDriverCommand
> {
	public constructor(
		private readonly updateDriver: UpdateDriverUsecase,
	) {}

	public async execute(
		command: UpdateDriverCommand,
	) {
		return this.updateDriver.execute(
			command.driverId,
			command.age,
			command.email,
			command.motorcycleLicenseType,
			command.drivingExperience,
		);
	}
}
