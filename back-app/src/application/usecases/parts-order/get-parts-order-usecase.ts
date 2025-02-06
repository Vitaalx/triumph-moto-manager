import { type IPartsOrderRepository } from "@application/ports/repositories/parts-order";
import { PartsOrderNotFoundError } from "@domain/errors/parts-order/parts-order-not-found";

export class GetPartsOrderUsecase {
	public constructor(private readonly partsOrderRepository: IPartsOrderRepository) {}

	public async execute(
		partsOrderId: string,
	) {
		const partsOrder = await this.partsOrderRepository.findById(partsOrderId);

		if (partsOrder === null) {
			return new PartsOrderNotFoundError();
		}

		return partsOrder;
	}
}
