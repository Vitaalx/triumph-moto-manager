import { type UpdatePartsOrderUsecase } from "@application/usecases/parts-order/update-parts-order-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class UpdatePartsOrderCommand extends Command<ReturnType<UpdatePartsOrderUsecase["execute"]>> {
	public constructor(
		public partsOrderId: string,
		public supplierName: string,
		public parts: {
			sparePartId: string;
			quantity: number;
		}[],
	) {
		super();
	}
}
