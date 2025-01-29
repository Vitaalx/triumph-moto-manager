import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateMotorcycleIncidentCommand } from "../definitions/update-motorcycle-incident";
import { UpdateMotorcycleIncidentUsecase } from "@application/usecases/motorcycle-incident/update-motorcycle-incident-usecase";

@CommandHandler(UpdateMotorcycleIncidentCommand)
export class UpdateMotorcycleIncidentCommandHandler implements ICommandHandler<
	UpdateMotorcycleIncidentCommand
> {
	public constructor(private readonly updateMotorcycleIncident: UpdateMotorcycleIncidentUsecase) {}

	public execute(command: UpdateMotorcycleIncidentCommand) {
		return this.updateMotorcycleIncident.execute(
			command.motorcycleIncidentId,
			command.type,
			command.description,
			command.incidentDate,
			command.incidentTime,
			command.location,
		);
	}
}
