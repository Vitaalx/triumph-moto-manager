import { type AddMotorcycleToDriverUsecase } from "@application/usecases/driver/add-motorcycle-to-driver-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class AddMotorcycleToDriverCommand extends Command<ReturnType<AddMotorcycleToDriverUsecase["execute"]>> {
	public constructor(
		public readonly driverId: string,
		public readonly motorcycleId: string,
	) {
		super();
	}
}
