import { type IPartsOrderRepository } from "@application/ports/repositories/parts-order";

export class GetPartsOrdersInDeliveryUsecase {
	public constructor(private readonly partsOrderRepository: IPartsOrderRepository) {}

	public async execute() {
		return this.partsOrderRepository.findAllByStatus("IN_DELIVERY");
	}
}
