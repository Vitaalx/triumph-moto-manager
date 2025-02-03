import { type GetMotorcycleMaintenancesInProgressUsecase } from "@application/usecases/motorcycle-maintenance/get-motorcycle-maintenances-in-progress-usecase";
import { Query } from "@nestjs-architects/typed-cqrs";

export class GetMotorcycleMaintenancesInProgressQuery extends Query<ReturnType<GetMotorcycleMaintenancesInProgressUsecase["execute"]>> {
	public constructor() {
		super();
	}
}
