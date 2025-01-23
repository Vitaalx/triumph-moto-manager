import { type GetDriversUseCase } from "@application/usecases/driver/get-drivers-usecase";
import { Query } from "@nestjs-architects/typed-cqrs";

export class GetDriversQuery extends Query<ReturnType<GetDriversUseCase["execute"]>> {
	public constructor() {
		super();
	}
}
