import { type GetSparePartUsecase } from "@application/usecases/spare-part/get-spare-part-usecase";
import { Query } from "@nestjs-architects/typed-cqrs";

export class GetSparePartQuery extends Query<ReturnType<GetSparePartUsecase["execute"]>> {
	public constructor(
		public readonly sparePartId: string,
	) {
		super();
	}
}
