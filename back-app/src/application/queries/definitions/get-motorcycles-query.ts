import { type GetMotorcyclesUsecase } from "@application/usecases/motorcycle/get-motorcycles-usecase";
import { Query } from "@nestjs-architects/typed-cqrs";

export class GetMotorcyclesQuery extends Query<ReturnType<GetMotorcyclesUsecase["execute"]>> {
	public constructor() {
		super();
	}
}
