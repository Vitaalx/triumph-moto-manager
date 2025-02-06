import { type GetPartsOrdersDeliveredUsecase } from "@application/usecases/parts-order/get-parts-orders-delivered-usecase";
import { Query } from "@nestjs-architects/typed-cqrs";

export class GetPartsOrdersDeliveredQuery extends Query<ReturnType<GetPartsOrdersDeliveredUsecase["execute"]>> {
	public constructor() {
		super();
	}
}
