import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteMotorcycleFromDriverCommand } from "../definitions/delete-motorcycle-from-driver";
import { DeleteMotorcycleFromDriverUsecase } from "@application/usecases/driver/delete-motorcycle-from-driver-usecase";

@CommandHandler(DeleteMotorcycleFromDriverCommand)
export class DeleteMotorcycleFromDriverCommandHandler implements ICommandHandler<
	DeleteMotorcycleFromDriverCommand
> {
	public constructor(private readonly deleteMotorcycleFromDriver: DeleteMotorcycleFromDriverUsecase) {}

	public execute(command: DeleteMotorcycleFromDriverCommand) {
		return this.deleteMotorcycleFromDriver.execute(
			command.driverId,
			command.motorcycleId,
		);
	}
}
