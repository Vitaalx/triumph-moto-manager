import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type ISparePartRepository } from "@application/ports/repositories/spare-part";
import { SparePartEntity } from "@domain/entities/spare-part";
import { SparePartAlreadyExistsError } from "@domain/errors/spare-part/spare-part-already-exists";
import { type SparePartCreatedEvent } from "@domain/events/spare-part/spare-part-created-event";

export class CreateSparePartUsecase {
	public constructor(
		private readonly sparePartRepository: ISparePartRepository,
		private readonly eventStoreRepository: IEventStoreRepository,
	) {}

	public async execute(
		name: string,
		brand: string,
		refNumber: string,
		stock: number,
		price: number,
	) {
		const existingSparePart = await this.sparePartRepository.findByRefNumber(refNumber);

		if (existingSparePart !== null) {
			return new SparePartAlreadyExistsError();
		}

		const sparePart = SparePartEntity.from(
			name,
			brand,
			refNumber,
			stock,
			price,
		);

		if (sparePart instanceof Error) {
			return sparePart;
		}

		const event: SparePartCreatedEvent = {
			date: new Date(),
			identifier: sparePart.id,
			type: "SPARE-PART_CREATED",
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

		return this.sparePartRepository.save(sparePart);
	}
}
