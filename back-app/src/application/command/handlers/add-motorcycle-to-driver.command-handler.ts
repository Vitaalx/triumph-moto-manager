import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AddMotorcycleToDriverCommand } from "../definitions/add-motorcycle-to-driver";
import { AddMotorcycleToDriverUsecase } from "@application/usecases/driver/add-motorcycle-to-driver-usecase";

@CommandHandler(AddMotorcycleToDriverCommand)
export class AddMotorcycleToDriverCommandHandler implements ICommandHandler<
	AddMotorcycleToDriverCommand
> {
	public constructor(private readonly addMotorcycleToDriver: AddMotorcycleToDriverUsecase) {}

	public execute(command: AddMotorcycleToDriverCommand) {
		return this.addMotorcycleToDriver.execute(
			command.driverId,
			command.motorcycleId,
		);
	}
}
