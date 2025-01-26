import { type GetMotorcyclesTrialCommingUsecase } from "@application/usecases/motorcycle-try/get-motorcycles-trial-comming-usecase";
import { Query } from "@nestjs-architects/typed-cqrs";

export class GetMotorcyclesTrialCommingQuery extends Query<ReturnType<GetMotorcyclesTrialCommingUsecase["execute"]>> {
	public constructor() {
		super();
	}
}
