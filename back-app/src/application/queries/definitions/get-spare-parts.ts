import { type GetSparePartsUsecase } from "@application/usecases/spare-part/get-spare-parts-usecase";
import { Query } from "@nestjs-architects/typed-cqrs";

export class GetSparePartsQuery extends Query<ReturnType<GetSparePartsUsecase["execute"]>> {
	public constructor() {
		super();
	}
}
