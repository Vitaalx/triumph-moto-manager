import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateSparePartCommand } from "../definitions/update-spare-part";
import { UpdateSparePartUsecase } from "@application/usecases/spare-part/update-spare-part-usecase";

@CommandHandler(UpdateSparePartCommand)
export class UpdateSparePartCommandHandler implements ICommandHandler<
	UpdateSparePartCommand
> {
	public constructor(private readonly updateSparePart: UpdateSparePartUsecase) {}

	public async execute(command: UpdateSparePartCommand) {
		return this.updateSparePart.execute(
			command.sparePartId,
			command.name,
			command.brand,
			command.stock,
			command.price,
		);
	}
}
