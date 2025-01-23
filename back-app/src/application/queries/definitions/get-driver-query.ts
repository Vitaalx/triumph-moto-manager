import { type GetDriverUseCase } from "@application/usecases/driver/get-driver-usecase";
import { Query } from "@nestjs-architects/typed-cqrs";

export class GetDriverQuery extends Query<ReturnType<GetDriverUseCase["execute"]>> {
	public constructor(public driverId: string) {
		super();
	}
}
