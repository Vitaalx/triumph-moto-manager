import { QueryHandler, type IQueryHandler } from "@nestjs/cqrs";
import { GetMotorcycleQuery } from "../definitions/get-motorcycle-query";
import { GetMotorcycleUsecase } from "@application/usecases/motorcycle/get-motorcycle-usecase";

@QueryHandler(GetMotorcycleQuery)
export class GetMotorcycleQueryHandler implements IQueryHandler<
	GetMotorcycleQuery
> {
	public constructor(private readonly getMotorcycle: GetMotorcycleUsecase) {}

	public async execute(query: GetMotorcycleQuery) {
		return this.getMotorcycle.execute(query.licensePlate);
	}
}
