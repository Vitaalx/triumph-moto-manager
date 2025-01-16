import { type DeleteMotorcycleUsecase } from "@application/usecases/motorcycle/delete-motorcycle-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class DeleteMotorcycleCommand extends Command<ReturnType<DeleteMotorcycleUsecase["execute"]>> {
	public constructor(public readonly licensePlate: string) {
		super();
	}
}
