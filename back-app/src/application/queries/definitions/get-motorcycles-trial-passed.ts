import { type GetMotorcyclesTrialPassedUsecase } from "@application/usecases/motorcycle-try/get-motorcycles-trial-passed-usecase";
import { Query } from "@nestjs-architects/typed-cqrs";

export class GetMotorcyclesTrialPassedQuery extends Query<ReturnType<GetMotorcyclesTrialPassedUsecase["execute"]>> {
	public constructor() {
		super();
	}
}
