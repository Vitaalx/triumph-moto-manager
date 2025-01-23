import { CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { DeleteDriverCommand } from "../definitions/delete-driver";
import { DeleteDriverUsecase } from "@application/usecases/driver/delete-driver-usecase";

@CommandHandler(DeleteDriverCommand)
export class DeleteDriverCommandHandler implements ICommandHandler<
	DeleteDriverCommand
> {
	public constructor(private readonly deleteDriver: DeleteDriverUsecase) {}

	public execute(command: DeleteDriverCommand) {
		return this.deleteDriver.execute(command.driverId);
	}
}
