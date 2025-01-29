import { type UpdateMotorcycleIncidentUsecase } from "@application/usecases/motorcycle-incident/update-motorcycle-incident-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class UpdateMotorcycleIncidentCommand extends Command<ReturnType<UpdateMotorcycleIncidentUsecase["execute"]>> {
	public constructor(
		public readonly motorcycleIncidentId: string,
		public readonly type: string,
		public readonly description: string,
		public readonly incidentDate: Date,
		public readonly incidentTime: string,
		public readonly location: string,
	) {
		super();
	}
}
