import { CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { DeleteMotorcycleTryCommand } from "../definitions/delete-motorcycle-try";
import { DeleteMotorcycleTryUsecase } from "@application/usecases/motorcycle-try/delete-motorcycle-try-usecase";

@CommandHandler(DeleteMotorcycleTryCommand)
export class DeleteMotorcycleTryCommandHandler implements ICommandHandler<
	DeleteMotorcycleTryCommand
> {
	public constructor(private readonly deleteMotorcycleTry: DeleteMotorcycleTryUsecase) {}

	public execute(command: DeleteMotorcycleTryCommand) {
		return this.deleteMotorcycleTry.execute(command.motorcycleTryId);
	}
}
