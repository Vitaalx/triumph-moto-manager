import { type GetMotorcyclesInTrialUsecase } from "@application/usecases/motorcycle-try/get-motorcycles-in-trial-usecase";
import { Query } from "@nestjs-architects/typed-cqrs";

export class GetMotorcyclesInTrialQuery extends Query<ReturnType<GetMotorcyclesInTrialUsecase["execute"]>> {
	public constructor() {
		super();
	}
}
