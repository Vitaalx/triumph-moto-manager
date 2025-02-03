import { type GetMotorcycleMaintenanceUsecase } from "@application/usecases/motorcycle-maintenance/get-motorcycle-maintenance-usecase";
import { Query } from "@nestjs-architects/typed-cqrs";

export class GetMotorcycleMaintenanceQuery extends Query<ReturnType<GetMotorcycleMaintenanceUsecase["execute"]>> {
	public constructor(public readonly motorcycleMaintenanceId: string) {
		super();
	}
}
