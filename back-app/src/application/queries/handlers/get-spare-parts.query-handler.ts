import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetSparePartsQuery } from "../definitions/get-spare-parts";
import { GetSparePartsUsecase } from "@application/usecases/spare-part/get-spare-parts-usecase";

@QueryHandler(GetSparePartsQuery)
export class GetSparePartsQueryHandler implements IQueryHandler<
	GetSparePartsQuery
> {
	public constructor(private readonly getSpareParts: GetSparePartsUsecase) {}

	public execute() {
		return this.getSpareParts.execute();
	}
}
