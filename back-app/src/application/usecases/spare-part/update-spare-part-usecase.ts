import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type ISparePartRepository } from "@application/ports/repositories/spare-part";
import { SparePartNotFoundError } from "@domain/errors/spare-part/spare-part-not-found";
import { type SparePartUpdatedEvent } from "@domain/events/spare-part/spare-part-updated-event";
import { SparePartPrice } from "@domain/types/spare-part-price";
import { NormalizedString } from "@domain/types/string";

export class UpdateSparePartUsecase {
	public constructor(
		private readonly sparePartRepository: ISparePartRepository,
		private readonly eventStoreRepository: IEventStoreRepository,
	) {}

	public async execute(
		sparePartId: string,
		name: string,
		brand: string,
		stock: number,
		price: number,
	) {
		const sparePart = await this.sparePartRepository.findById(sparePartId);

		if (sparePart === null) {
			return new SparePartNotFoundError();
		}

		const normalizedName = NormalizedString.from(name, "name");

		if (normalizedName instanceof Error) {
			return normalizedName;
		}

		const normalizedBrand = NormalizedString.from(brand, "brand");

		if (normalizedBrand instanceof Error) {
			return normalizedBrand;
		}

		const sparePartPrice = SparePartPrice.from(price);

		if (sparePartPrice instanceof Error) {
			return sparePartPrice;
		}

		sparePart.name = normalizedName;
		sparePart.brand = normalizedBrand;
		sparePart.stock = stock;
		sparePart.price = sparePartPrice;

		const event: SparePartUpdatedEvent = {
			date: new Date(),
			identifier: sparePart.id,
			type: "SPARE-PART_UPDATED",
			version: 1,
			data: {
				name: sparePart.name.value,
				brand: sparePart.brand.value,
				stock: sparePart.stock,
				price: sparePart.price.value,
			},
		};

		await this.eventStoreRepository.publish(event);

		return this.sparePartRepository.update(sparePartId, sparePart);
	}
}
