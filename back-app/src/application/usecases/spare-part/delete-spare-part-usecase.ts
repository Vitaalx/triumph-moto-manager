import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type ISparePartRepository } from "@application/ports/repositories/spare-part";
import { SparePartNotFoundError } from "@domain/errors/spare-part/spare-part-not-found";
import { type SparePartDeletedEvent } from "@domain/events/spare-part/spare-part-deleted-event";

export class DeleteSparePartUsecase {
	public constructor(
		private readonly sparePartRepository: ISparePartRepository,
		private readonly eventStoreRepository: IEventStoreRepository,
	) {}

	public async execute(sparePartId: string) {
		const sparePart = await this.sparePartRepository.findById(sparePartId);

		if (sparePart === null) {
			return new SparePartNotFoundError();
		}

		const event: SparePartDeletedEvent = {
			date: new Date(),
			identifier: sparePart.id,
			type: "SPARE-PART_DELETED",
			version: 1,
			data: {
				name: sparePart.name.value,
				brand: sparePart.brand.value,
				refNumber: sparePart.refNumber.value,
				stock: sparePart.stock,
				price: sparePart.price.value,
			},
		};

		await this.eventStoreRepository.publish(event);

		return this.sparePartRepository.delete(sparePartId);
	}
}
