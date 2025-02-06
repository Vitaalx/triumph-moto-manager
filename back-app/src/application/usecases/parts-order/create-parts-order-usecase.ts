import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type IPartsOrderRepository } from "@application/ports/repositories/parts-order";
import { type IPartsOrderSparePartsRepository } from "@application/ports/repositories/parts-order-spare-parts";
import { type ISparePartRepository } from "@application/ports/repositories/spare-part";
import { PartsOrderEntity } from "@domain/entities/parts-order";
import { PartsOrderSparePartEntity } from "@domain/entities/parts-order-spare-parts";
import { SparePartNotFoundError } from "@domain/errors/spare-part/spare-part-not-found";
import { type PartsOrderCreatedEvent } from "@domain/events/parts-order/parts-order-created-event";

export class CreatePartsOrderUsecase {
	public constructor(
		private readonly sparePartRepository: ISparePartRepository,
		private readonly partsOrderRepository: IPartsOrderRepository,
		private readonly partsOrderSparePartRepository: IPartsOrderSparePartsRepository,
		private readonly eventStoreRepository: IEventStoreRepository,
	) {}

	public async execute(
		supplierName: string,
		parts: {
			sparePartId: string;
			quantity: number;
		}[],
	) {
		const partsOrder = PartsOrderEntity.create(supplierName);

		if (partsOrder instanceof Error) {
			return partsOrder;
		}

		let totalPrice = 0;

		const partsOrderSparePartsPromises: Promise<void>[] = [];

		try {
			const promises = parts.map(
				async(part) => {
					const sparePart = await this.sparePartRepository.findById(part.sparePartId);

					if (sparePart === null) {
						throw new SparePartNotFoundError();
					}

					totalPrice += sparePart.price.value * part.quantity;

					const partsOrderSparePart = PartsOrderSparePartEntity.create(
						partsOrder.id,
						part.sparePartId,
						part.quantity,
					);

					await this.partsOrderSparePartRepository.save(partsOrderSparePart);
				},
			);
			partsOrderSparePartsPromises.push(...promises);
		} catch (error) {
			return error as SparePartNotFoundError;
		}

		partsOrder.totalPrice = totalPrice;

		await this.partsOrderRepository.save(partsOrder);

		await Promise.all(partsOrderSparePartsPromises);

		const event: PartsOrderCreatedEvent = {
			date: new Date(),
			identifier: partsOrder.id,
			type: "PARTS-ORDER_CREATED",
			version: 1,
			data: {
				supplierName: partsOrder.supplierName,
				parts: partsOrder.parts,
				totalPrice: partsOrder.totalPrice,
				createDate: partsOrder.createDate,
				status: partsOrder.status,
			},
		};

		await this.eventStoreRepository.publish(event);
	}
}
