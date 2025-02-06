import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePartsOrderCommand } from "../definitions/update-parts-order";
import { UpdatePartsOrderUsecase } from "@application/usecases/parts-order/update-parts-order-usecase";

@CommandHandler(UpdatePartsOrderCommand)
export class UpdatePartsOrderCommandHandler implements ICommandHandler<
	UpdatePartsOrderCommand
> {
	public constructor(
		private readonly updatePartsOrder: UpdatePartsOrderUsecase,
	) {}

	public async execute(command: UpdatePartsOrderCommand) {
		return this.updatePartsOrder.execute(
			command.partsOrderId,
			command.parts,
			command.supplierName,
		);
	}
}
