import { type DeleteSparePartUsecase } from "@application/usecases/spare-part/delete-spare-part-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class DeleteSparePartCommand extends Command<ReturnType<DeleteSparePartUsecase["execute"]>> {
	public constructor(
		public readonly sparePartId: string,
	) {
		super();
	}
}
