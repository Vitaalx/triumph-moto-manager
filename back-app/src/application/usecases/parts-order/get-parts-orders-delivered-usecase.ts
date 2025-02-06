import { type IPartsOrderRepository } from "@application/ports/repositories/parts-order";

export class GetPartsOrdersDeliveredUsecase {
	public constructor(private readonly partsOrderRepository: IPartsOrderRepository) {}

	public async execute() {
		return this.partsOrderRepository.findAllByStatus("DELIVERED");
	}
}
