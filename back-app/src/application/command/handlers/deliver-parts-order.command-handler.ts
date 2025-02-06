import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeliverPartsOrderCommand } from "../definitions/deliver-parts-order";
import { DeliverPartsOrderUsecase } from "@application/usecases/parts-order/deliver-parts-order-usecase";

@CommandHandler(DeliverPartsOrderCommand)
export class DeliverPartsOrderCommandHandler implements ICommandHandler<
	DeliverPartsOrderCommand
> {
	public constructor(
		private readonly deliverPartsOrder: DeliverPartsOrderUsecase,
	) {}

	public async execute(command: DeliverPartsOrderCommand) {
		return this.deliverPartsOrder.execute(
			command.partsOrderId,
		);
	}
}
