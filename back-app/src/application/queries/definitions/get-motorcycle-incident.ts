import { type GetMotorcycleIncidentUsecase } from "@application/usecases/motorcycle-incident/get-motorcycle-incident-usecase";
import { Query } from "@nestjs-architects/typed-cqrs";

export class GetMotorcycleIncidentQuery extends Query<ReturnType<GetMotorcycleIncidentUsecase["execute"]>> {
	public constructor(public readonly motorcycleIncidentId: string) {
		super();
	}
}
