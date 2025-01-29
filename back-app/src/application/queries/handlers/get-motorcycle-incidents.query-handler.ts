import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMotorcycleIncidentsQuery } from "../definitions/get-motorcycle-incidents";
import { GetMotorcycleIncidentsUsecase } from "@application/usecases/motorcycle-incident/get-motorcycle-incidents-usecase";

@QueryHandler(GetMotorcycleIncidentsQuery)
export class GetMotorcycleIncidentsQueryHandler implements IQueryHandler<
	GetMotorcycleIncidentsQuery
> {
	public constructor(private readonly getMotorcycleIncidents: GetMotorcycleIncidentsUsecase) {}

	public execute() {
		return this.getMotorcycleIncidents.execute();
	}
}
