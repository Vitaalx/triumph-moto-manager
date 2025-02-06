import { type GetPartsOrderUsecase } from "@application/usecases/parts-order/get-parts-order-usecase";
import { Query } from "@nestjs-architects/typed-cqrs";

export class GetPartsOrderQuery extends Query<ReturnType<GetPartsOrderUsecase["execute"]>> {
	public constructor(public partsOrderId: string) {
		super();
	}
}
