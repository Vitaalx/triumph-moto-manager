import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMotorcycleMaintenancesClosedQuery } from "../definitions/get-motorcycle-maintenances-closed";
import { GetMotorcycleMaintenancesClosedUsecase } from "@application/usecases/motorcycle-maintenance/get-motorcycle-maintenances-closed-usecase";

@QueryHandler(GetMotorcycleMaintenancesClosedQuery)
export class GetMotorcycleMaintenancesClosedQueryHandler implements IQueryHandler<
	GetMotorcycleMaintenancesClosedQuery
> {
	public constructor(private readonly motorcycleMaintenancesClosed: GetMotorcycleMaintenancesClosedUsecase) {}

	public async execute() {
		return this.motorcycleMaintenancesClosed.execute();
	}
}
