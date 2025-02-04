import { type CreateSparePartUsecase } from "@application/usecases/spare-part/create-spare-part-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class CreateSparePartCommand extends Command<ReturnType<CreateSparePartUsecase["execute"]>> {
	public constructor(
		public readonly name: string,
		public readonly brand: string,
		public readonly refNumber: string,
		public readonly stock: number,
		public readonly price: number,
	) {
		super();
	}
}
