import { type DeleteMotorcycleIncidentUsecase } from "@application/usecases/motorcycle-incident/delete-motorcycle-incident-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class DeleteMotorcycleIncidentCommand extends Command<ReturnType<DeleteMotorcycleIncidentUsecase["execute"]>> {
	public constructor(public readonly motorcycleIncidentId: string) {
		super();
	}
}
