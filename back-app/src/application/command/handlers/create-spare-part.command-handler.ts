import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateSparePartCommand } from "../definitions/create-spare-part";
import { CreateSparePartUsecase } from "@application/usecases/spare-part/create-spare-part-usecase";

@CommandHandler(CreateSparePartCommand)
export class CreateSparePartCommandHandler implements ICommandHandler<
	CreateSparePartCommand
> {
	public constructor(private readonly createSparePart: CreateSparePartUsecase) {}

	public async execute(command: CreateSparePartCommand) {
		return this.createSparePart.execute(
			command.name,
			command.brand,
			command.refNumber,
			command.stock,
			command.price,
		);
	}
}
