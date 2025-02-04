import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteSparePartCommand } from "../definitions/delete-spare-part";
import { DeleteSparePartUsecase } from "@application/usecases/spare-part/delete-spare-part-usecase";

@CommandHandler(DeleteSparePartCommand)
export class DeleteSparePartCommandHandler implements ICommandHandler<
	DeleteSparePartCommand
> {
	public constructor(private readonly deleteSparePart: DeleteSparePartUsecase) {}

	public async execute(command: DeleteSparePartCommand) {
		return this.deleteSparePart.execute(command.sparePartId);
	}
}
