import { type CreateMotorcycleUsecase } from "@application/usecases/motorcycle/create-motorcycle-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class CreateMotorcycleCommand extends Command<ReturnType<CreateMotorcycleUsecase["execute"]>> {
	public constructor(
		public readonly licensePlate: string,
		public readonly model: string,
		public readonly year: number,
		public readonly brand: string,
		public readonly price: number,
		public readonly maintenanceInterval: number,
		public readonly mileage: number,
		public readonly warrantyEndDate?: Date,
	) {
		super();
	}
}
