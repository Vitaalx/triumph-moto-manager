import { type CreateMotorcycleIncidentUsecase } from "@application/usecases/motorcycle-incident/create-motorcycle-incident-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class CreateMotorcycleIncidentCommand extends Command<ReturnType<CreateMotorcycleIncidentUsecase["execute"]>> {
	public constructor(
		public readonly type: string,
		public readonly description: string,
		public readonly motorcycleId: string,
		public readonly driverId: string,
		public readonly incidentDate: Date,
		public readonly incidentTime: string,
		public readonly location: string,
	) {
		super();
	}
}
