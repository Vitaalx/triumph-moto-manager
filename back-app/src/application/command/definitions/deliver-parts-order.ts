import { type DeliverPartsOrderUsecase } from "@application/usecases/parts-order/deliver-parts-order-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class DeliverPartsOrderCommand extends Command<ReturnType<DeliverPartsOrderUsecase["execute"]>> {
	public constructor(public partsOrderId: string) {
		super();
	}
}
