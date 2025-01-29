import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateMotorcycleIncidentCommand } from "../definitions/create-motorcycle-incident";
import { CreateMotorcycleIncidentUsecase } from "@application/usecases/motorcycle-incident/create-motorcycle-incident-usecase";

@CommandHandler(CreateMotorcycleIncidentCommand)
export class CreateMotorcycleIncidentCommandHandler implements ICommandHandler<
	CreateMotorcycleIncidentCommand
> {
	public constructor(
		private readonly createMotorcycleIncident: CreateMotorcycleIncidentUsecase,
	) {}

	public async execute(command: CreateMotorcycleIncidentCommand) {
		return this.createMotorcycleIncident.execute(
			command.type,
			command.description,
			command.motorcycleId,
			command.driverId,
			command.incidentDate,
			command.incidentTime,
			command.location,
		);
	}
}
