import { type UpdateMotorcycleMaintenanceUsecase } from "@application/usecases/motorcycle-maintenance/update-motorcycle-maintenance-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class UpdateMotorcycleMaintenanceCommand extends Command<ReturnType<UpdateMotorcycleMaintenanceUsecase["execute"]>> {
	public constructor(
		public readonly maintenanceId: string,
		public readonly technicalRecommendations: string,
		public readonly usedSpareParts: {
			sparePartId: string;
			quantity: number;
		}[],
		public readonly laborPrice: number,
	) {
		super();
	}
}
