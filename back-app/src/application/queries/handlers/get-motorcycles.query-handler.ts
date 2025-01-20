import { QueryHandler, type IQueryHandler } from "@nestjs/cqrs";
import { GetMotorcyclesQuery } from "../definitions/get-motorcycles-query";
import { GetMotorcyclesUsecase } from "@application/usecases/motorcycle/get-motorcycles-usecase";

@QueryHandler(GetMotorcyclesQuery)
export class GetMotorcyclesQueryHandler implements IQueryHandler<
	GetMotorcyclesQuery
> {
	public constructor(private readonly getMotorcycles: GetMotorcyclesUsecase) {}

	public async execute() {
		return this.getMotorcycles.execute();
	}
}
