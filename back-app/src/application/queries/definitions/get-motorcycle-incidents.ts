import { type GetMotorcycleIncidentsUsecase } from "@application/usecases/motorcycle-incident/get-motorcycle-incidents-usecase";
import { Query } from "@nestjs-architects/typed-cqrs";

export class GetMotorcycleIncidentsQuery extends Query<ReturnType<GetMotorcycleIncidentsUsecase["execute"]>> {
	public constructor() {
		super();
	}
}
