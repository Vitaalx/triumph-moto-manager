import { type UpdateSparePartUsecase } from "@application/usecases/spare-part/update-spare-part-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class UpdateSparePartCommand extends Command<ReturnType<UpdateSparePartUsecase["execute"]>> {
	public constructor(
		public readonly sparePartId: string,
		public readonly name: string,
		public readonly brand: string,
		public readonly stock: number,
		public readonly price: number,
	) {
		super();
	}
}
