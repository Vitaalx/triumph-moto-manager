import { type CreateMotorcycleTryUsecase } from "@application/usecases/motorcycle-try/create-motorcycle-try-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class CreateMotorcycleTryCommand extends Command<ReturnType<CreateMotorcycleTryUsecase["execute"]>> {
	public constructor(
		public readonly driverId: string,
		public readonly motorcycleId: string,
		public readonly startDate: Date,
		public readonly endDate: Date,
	) {
		super();
	}
}
