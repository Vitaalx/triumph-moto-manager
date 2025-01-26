import { type DeleteMotorcycleTryUsecase } from "@application/usecases/motorcycle-try/delete-motorcycle-try-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class DeleteMotorcycleTryCommand extends Command<ReturnType<DeleteMotorcycleTryUsecase["execute"]>> {
	public constructor(public readonly motorcycleTryId: string) {
		super();
	}
}
