import { QueryHandler, type IQueryHandler } from "@nestjs/cqrs";
import { GetPartsOrdersInDeliveryQuery } from "../definitions/get-parts-orders-in-delivery";
import { GetPartsOrdersInDeliveryUsecase } from "@application/usecases/parts-order/get-parts-orders-in-delivery-usecase";

@QueryHandler(GetPartsOrdersInDeliveryQuery)
export class GetPartsOrdersInDeliveryQueryHandler implements IQueryHandler<
	GetPartsOrdersInDeliveryQuery
> {
	public constructor(private readonly getPartsOrdersInDelivery: GetPartsOrdersInDeliveryUsecase) {}

	public async execute(query: GetPartsOrdersInDeliveryQuery) {
		return this.getPartsOrdersInDelivery.execute();
	}
}
