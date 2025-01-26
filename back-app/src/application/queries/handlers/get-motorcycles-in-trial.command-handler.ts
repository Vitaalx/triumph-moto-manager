import { QueryHandler, type IQueryHandler } from "@nestjs/cqrs";
import { GetMotorcyclesInTrialQuery } from "../definitions/get-motorcycles-in-trial";
import { GetMotorcyclesInTrialUsecase } from "@application/usecases/motorcycle-try/get-motorcycles-in-trial-usecase";

@QueryHandler(GetMotorcyclesInTrialQuery)
export class GetMotorcyclesInTrialQueryHandler implements IQueryHandler<
	GetMotorcyclesInTrialQuery
> {
	public constructor(private readonly getMotorcyclesInTrial: GetMotorcyclesInTrialUsecase) {}

	public async execute() {
		return this.getMotorcyclesInTrial.execute();
	}
}
