import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMotorcycleIncidentQuery } from "../definitions/get-motorcycle-incident";
import { GetMotorcycleIncidentUsecase } from "@application/usecases/motorcycle-incident/get-motorcycle-incident-usecase";

@QueryHandler(GetMotorcycleIncidentQuery)
export class GetMotorcycleIncidentQueryHandler implements IQueryHandler<
	GetMotorcycleIncidentQuery
> {
	public constructor(private readonly getMotorcycleIncident: GetMotorcycleIncidentUsecase) {}

	public async execute(query: GetMotorcycleIncidentQuery) {
		return this.getMotorcycleIncident.execute(query.motorcycleIncidentId);
	}
}
