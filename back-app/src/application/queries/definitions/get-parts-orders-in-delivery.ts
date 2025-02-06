import { type GetPartsOrdersInDeliveryUsecase } from "@application/usecases/parts-order/get-parts-orders-in-delivery-usecase";
import { Query } from "@nestjs-architects/typed-cqrs";

export class GetPartsOrdersInDeliveryQuery extends Query<ReturnType<GetPartsOrdersInDeliveryUsecase["execute"]>> {
	public constructor() {
		super();
	}
}
