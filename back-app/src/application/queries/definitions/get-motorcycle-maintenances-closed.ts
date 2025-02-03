import { type GetMotorcycleMaintenancesClosedUsecase } from "@application/usecases/motorcycle-maintenance/get-motorcycle-maintenances-closed-usecase";
import { Query } from "@nestjs-architects/typed-cqrs";

export class GetMotorcycleMaintenancesClosedQuery extends Query<ReturnType<GetMotorcycleMaintenancesClosedUsecase["execute"]>> {
	public constructor() {
		super();
	}
}
