import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeletePartsOrderCommand } from "../definitions/delete-parts-order";
import { DeletePartsOrderUsecase } from "@application/usecases/parts-order/delete-parts-order-usecase";

@CommandHandler(DeletePartsOrderCommand)
export class DeletePartsOrderCommandHandler implements ICommandHandler<
	DeletePartsOrderCommand
> {
	public constructor(
		private readonly deletePartsOrder: DeletePartsOrderUsecase,
	) {}

	public async execute(command: DeletePartsOrderCommand) {
		return this.deletePartsOrder.execute(
			command.partsOrderId,
		);
	}
}
