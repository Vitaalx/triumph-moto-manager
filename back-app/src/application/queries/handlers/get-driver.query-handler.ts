import { QueryHandler, type IQueryHandler } from "@nestjs/cqrs";
import { GetDriverQuery } from "../definitions/get-driver-query";
import { GetDriverUseCase } from "@application/usecases/driver/get-driver-usecase";

@QueryHandler(GetDriverQuery)
export class GetDriverQueryHandler implements IQueryHandler<
	GetDriverQuery
> {
	public constructor(private readonly getDriver: GetDriverUseCase) {}

	public async execute(query: GetDriverQuery) {
		return this.getDriver.execute(query.driverId);
	}
}
