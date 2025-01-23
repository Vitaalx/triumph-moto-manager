import { QueryHandler, type IQueryHandler } from "@nestjs/cqrs";
import { GetDriversUseCase } from "@application/usecases/driver/get-drivers-usecase";
import { GetDriversQuery } from "../definitions/get-drivers-query";

@QueryHandler(GetDriversQuery)
export class GetDriversQueryHandler implements IQueryHandler<
	GetDriversQuery
> {
	public constructor(private readonly getDrivers: GetDriversUseCase) {}

	public async execute() {
		return this.getDrivers.execute();
	}
}
