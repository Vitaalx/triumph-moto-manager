import { type CreatePartsOrderUsecase } from "@application/usecases/parts-order/create-parts-order-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class CreatePartsOrderCommand extends Command<ReturnType<CreatePartsOrderUsecase["execute"]>> {
	public constructor(
		public supplierName: string,
		public parts: {
			sparePartId: string;
			quantity: number;
		}[],
	) {
		super();
	}
}
