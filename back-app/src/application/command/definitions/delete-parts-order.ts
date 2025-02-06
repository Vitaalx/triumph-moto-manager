import { type DeletePartsOrderUsecase } from "@application/usecases/parts-order/delete-parts-order-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class DeletePartsOrderCommand extends Command<ReturnType<DeletePartsOrderUsecase["execute"]>> {
	public constructor(public partsOrderId: string) {
		super();
	}
}
