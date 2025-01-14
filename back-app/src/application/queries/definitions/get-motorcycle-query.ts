import { type GetMotorcycleUsecase } from "@application/usecases/motorcycle/get-motorcycle-usecase";
import { Query } from "@nestjs-architects/typed-cqrs";

export class GetMotorcycleQuery extends Query<ReturnType<GetMotorcycleUsecase["execute"]>> {
	public constructor(public licensePlate: string) {
		super();
	}
}
