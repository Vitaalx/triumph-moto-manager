import { type UpdateMotorcycleUsecase } from "@application/usecases/motorcycle/update-motorcycle-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class UpdateMotorcycleCommand extends Command<ReturnType<UpdateMotorcycleUsecase["execute"]>> {
	public constructor(
		public readonly licensePlate: string,
		public readonly model: string,
		public readonly year: number,
		public readonly brand: string,
		public readonly price: number,
		public readonly maintenanceInterval: string,
	) {
		super();
	}
}
