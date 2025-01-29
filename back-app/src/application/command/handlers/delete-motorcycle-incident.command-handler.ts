import { CommandHandler, type ICommandHandler } from "@nestjs/cqrs";
import { DeleteMotorcycleIncidentCommand } from "../definitions/delete-motorcycle-incident";
import { DeleteMotorcycleIncidentUsecase } from "@application/usecases/motorcycle-incident/delete-motorcycle-incident-usecase";

@CommandHandler(DeleteMotorcycleIncidentCommand)
export class DeleteMotorcycleIncidentCommandHandler implements ICommandHandler<
	DeleteMotorcycleIncidentCommand
> {
	public constructor(private readonly deleteMotorcycleIncident: DeleteMotorcycleIncidentUsecase) {}

	public execute(command: DeleteMotorcycleIncidentCommand) {
		return this.deleteMotorcycleIncident.execute(command.motorcycleIncidentId);
	}
}
