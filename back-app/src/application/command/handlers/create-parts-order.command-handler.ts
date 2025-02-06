import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreatePartsOrderCommand } from "../definitions/create-parts-order";
import { CreatePartsOrderUsecase } from "@application/usecases/parts-order/create-parts-order-usecase";

@CommandHandler(CreatePartsOrderCommand)
export class CreatePartsOrderCommandHandler implements ICommandHandler<
	CreatePartsOrderCommand
> {
	public constructor(
		private readonly createPartsOrder: CreatePartsOrderUsecase,
	) {}

	public async execute(command: CreatePartsOrderCommand) {
		return this.createPartsOrder.execute(
			command.supplierName,
			command.parts,
		);
	}
}
