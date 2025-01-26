import { QueryHandler, type IQueryHandler } from "@nestjs/cqrs";
import { GetMotorcyclesTrialPassedQuery } from "../definitions/get-motorcycles-trial-passed";
import { GetMotorcyclesTrialPassedUsecase } from "@application/usecases/motorcycle-try/get-motorcycles-trial-passed-usecase";

@QueryHandler(GetMotorcyclesTrialPassedQuery)
export class GetMotorcyclesTrialPassedQueryHandler implements IQueryHandler<
	GetMotorcyclesTrialPassedQuery
> {
	public constructor(private readonly getMotorcyclesTrialPassed: GetMotorcyclesTrialPassedUsecase) {}

	public async execute() {
		return this.getMotorcyclesTrialPassed.execute();
	}
}
