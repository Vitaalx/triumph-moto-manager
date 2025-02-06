import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type IPartsOrderRepository } from "@application/ports/repositories/parts-order";
import { InvalidStatusPartsOrderError } from "@domain/errors/parts-order/invalid-status-parts-order";
import { PartsOrderNotFoundError } from "@domain/errors/parts-order/parts-order-not-found";
import { type PartsOrderDeliveredEvent } from "@domain/events/parts-order/parts-order-delivered-event";

export class DeliverPartsOrderUsecase {
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

		partsOrder.status = "DELIVERED";

		const event: PartsOrderDeliveredEvent = {
			date: new Date(),
			identifier: partsOrder.id,
			type: "PARTS-ORDER_DELIVERED",
			version: 1,
			data: {
				status: partsOrder.status,
			},
		};

		await this.eventStoreRepository.publish(event);

		return this.partsOrderRepository.save(partsOrder);
	}
}
