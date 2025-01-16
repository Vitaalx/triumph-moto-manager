import { CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { DeleteMotorcycleCommand } from "../definitions/delete-motorcycle";
import { DeleteMotorcycleUsecase } from "@application/usecases/motorcycle/delete-motorcycle-usecase";

@CommandHandler(DeleteMotorcycleCommand)
export class DeleteMotorcycleCommandHandler implements ICommandHandler<
	DeleteMotorcycleCommand
> {
	public constructor(private readonly deleteMotorcycle: DeleteMotorcycleUsecase) {}

	public execute(command: DeleteMotorcycleCommand) {
		return this.deleteMotorcycle.execute(command.licensePlate);
	}
}
