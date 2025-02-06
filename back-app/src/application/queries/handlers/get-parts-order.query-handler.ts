import { QueryHandler, type IQueryHandler } from "@nestjs/cqrs";
import { GetPartsOrderQuery } from "../definitions/get-parts-order";
import { GetPartsOrderUsecase } from "@application/usecases/parts-order/get-parts-order-usecase";

@QueryHandler(GetPartsOrderQuery)
export class GetPartsOrderQueryHandler implements IQueryHandler<
	GetPartsOrderQuery
> {
	public constructor(private readonly getPartsOrder: GetPartsOrderUsecase) {}

	public async execute(query: GetPartsOrderQuery) {
		return this.getPartsOrder.execute(
			query.partsOrderId,
		);
	}
}
