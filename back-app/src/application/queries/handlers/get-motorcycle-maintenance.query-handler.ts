import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMotorcycleMaintenanceQuery } from "../definitions/get-motorcycle-maintenance";
import { GetMotorcycleMaintenanceUsecase } from "@application/usecases/motorcycle-maintenance/get-motorcycle-maintenance-usecase";

@QueryHandler(GetMotorcycleMaintenanceQuery)
export class GetMotorcycleMaintenanceQueryHandler implements IQueryHandler<
	GetMotorcycleMaintenanceQuery
> {
	public constructor(private readonly motorcycleMaintenance: GetMotorcycleMaintenanceUsecase) {}

	public execute(query: GetMotorcycleMaintenanceQuery) {
		return this.motorcycleMaintenance.execute(query.motorcycleMaintenanceId);
	}
}
