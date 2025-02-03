import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMotorcycleMaintenancesInProgressQuery } from "../definitions/get-motorcycle-maintenances-in-progress";
import { GetMotorcycleMaintenancesInProgressUsecase } from "@application/usecases/motorcycle-maintenance/get-motorcycle-maintenances-in-progress-usecase";

@QueryHandler(GetMotorcycleMaintenancesInProgressQuery)
export class GetMotorcycleMaintenancesInProgressQueryHandler implements IQueryHandler<
	GetMotorcycleMaintenancesInProgressQuery
> {
	public constructor(private readonly motorcycleMaintenancesInProgress: GetMotorcycleMaintenancesInProgressUsecase) {}

	public async execute() {
		return this.motorcycleMaintenancesInProgress.execute();
	}
}
