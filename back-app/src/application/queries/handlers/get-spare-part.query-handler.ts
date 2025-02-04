import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetSparePartQuery } from "../definitions/get-spare-part";
import { GetSparePartUsecase } from "@application/usecases/spare-part/get-spare-part-usecase";

@QueryHandler(GetSparePartQuery)
export class GetSparePartQueryHandler implements IQueryHandler<
	GetSparePartQuery
> {
	public constructor(private readonly getSparePart: GetSparePartUsecase) {}

	public execute(query: GetSparePartQuery) {
		return this.getSparePart.execute(query.sparePartId);
	}
}
