import { type DeleteMotorcycleFromDriverUsecase } from "@application/usecases/driver/delete-motorcycle-from-driver-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class DeleteMotorcycleFromDriverCommand extends Command<ReturnType<DeleteMotorcycleFromDriverUsecase["execute"]>> {
	public constructor(
		public readonly driverId: string,
		public readonly motorcycleId: string,
	) {
		super();
	}
}
