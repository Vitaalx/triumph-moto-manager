import { QueryHandler, type IQueryHandler } from "@nestjs/cqrs";
import { GetMotorcyclesTrialCommingQuery } from "../definitions/get-motorcycles-trial-comming";
import { GetMotorcyclesTrialCommingUsecase } from "@application/usecases/motorcycle-try/get-motorcycles-trial-comming-usecase";

@QueryHandler(GetMotorcyclesTrialCommingQuery)
export class GetMotorcyclesTrialCommingQueryHandler implements IQueryHandler<
	GetMotorcyclesTrialCommingQuery
> {
	public constructor(private readonly getMotorcyclesTrialComming: GetMotorcyclesTrialCommingUsecase) {}

	public async execute() {
		return this.getMotorcyclesTrialComming.execute();
	}
}
