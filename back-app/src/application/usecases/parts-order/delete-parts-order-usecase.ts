import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type IPartsOrderRepository } from "@application/ports/repositories/parts-order";
import { InvalidStatusPartsOrderError } from "@domain/errors/parts-order/invalid-status-parts-order";
import { PartsOrderNotFoundError } from "@domain/errors/parts-order/parts-order-not-found";
import { type PartsOrderDeletedEvent } from "@domain/events/parts-order/parts-order-deleted-event";

export class DeletePartsOrderUsecase {
	public constructor(
		private readonly partsOrderRepository: IPartsOrderRepository,
		private readonly eventStoreRepository: IEventStoreRepository,
	) {}

	public async execute(
		partsOrderId: string,
	) {
		const partsOrder = await this.partsOrderRepository.findById(partsOrderId);

		if (partsOrder === null) {
			return new PartsOrderNotFoundError();
		}

		if (partsOrder.status !== "IN_DELIVERY") {
			return new InvalidStatusPartsOrderError();
		}

		const event: PartsOrderDeletedEvent = {
			date: new Date(),
			identifier: partsOrder.id,
			type: "PARTS-ORDER_DELETED",
			version: 1,
			data: {
				supplierName: partsOrder.supplierName,
				parts: partsOrder.parts,
				totalPrice: partsOrder.totalPrice,
				createDate: partsOrder.createDate,
				status: partsOrder.status,
			},
		};

		await this.eventStoreRepository.publish(event);

		return this.partsOrderRepository.delete(partsOrderId);
	}
}
