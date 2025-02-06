import { QueryHandler, type IQueryHandler } from "@nestjs/cqrs";
import { GetPartsOrdersDeliveredQuery } from "../definitions/get-parts-orders-delivered";
import { GetPartsOrdersDeliveredUsecase } from "@application/usecases/parts-order/get-parts-orders-delivered-usecase";

@QueryHandler(GetPartsOrdersDeliveredQuery)
export class GetPartsOrdersDeliveredQueryHandler implements IQueryHandler<
	GetPartsOrdersDeliveredQuery
> {
	public constructor(private readonly getPartsOrdersDelivered: GetPartsOrdersDeliveredUsecase) {}

	public async execute(query: GetPartsOrdersDeliveredQuery) {
		return this.getPartsOrdersDelivered.execute();
	}
}
