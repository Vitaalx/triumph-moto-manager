import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type IPartsOrderRepository } from "@application/ports/repositories/parts-order";
import { type IPartsOrderSparePartsRepository } from "@application/ports/repositories/parts-order-spare-parts";
import { type ISparePartRepository } from "@application/ports/repositories/spare-part";
import { InvalidPartsOrderSparePartError } from "@domain/errors/parts-order/invalid-parts-order-spare-pare";
import { InvalidStatusPartsOrderError } from "@domain/errors/parts-order/invalid-status-parts-order";
import { PartsOrderNotFoundError } from "@domain/errors/parts-order/parts-order-not-found";
import { SparePartNotFoundError } from "@domain/errors/spare-part/spare-part-not-found";
import { type PartsOrderUpdatedEvent } from "@domain/events/parts-order/parts-order-updated-event";
import { NormalizedString } from "@domain/types/string";

export class UpdatePartsOrderUsecase {
	public constructor(
		private readonly partsOrderRepository: IPartsOrderRepository,
		private readonly partsOrderSparePartsRepository: IPartsOrderSparePartsRepository,
		private readonly eventStoreRepository: IEventStoreRepository,
		private readonly sparePartRepository: ISparePartRepository,
	) {}

	public async execute(
		partsOrderId: string,
		parts: {
			sparePartId: string;
			quantity: number;
		}[],
		supplierName: string,
	) {
		const partsOrder = await this.partsOrderRepository.findById(partsOrderId);

		if (partsOrder === null) {
			return new PartsOrderNotFoundError();
		}

		if (partsOrder.status !== "IN_DELIVERY") {
			return new InvalidStatusPartsOrderError();
		}

		const normalizedSupplierName = NormalizedString.from(supplierName, "supplierName");

		if (normalizedSupplierName instanceof Error) {
			return normalizedSupplierName;
		}

		let totalPrice = 0;

		try {
			await Promise.all(
				parts.map(
					async(part) => {
						if (!partsOrder.parts.some((pt) => pt.sparePartId === part.sparePartId)) {
							throw new InvalidPartsOrderSparePartError();
						}
						const foundedPart = partsOrder.parts.find((pt) => pt.sparePartId === part.sparePartId);

						if (foundedPart) {
							const sparePart = await this.sparePartRepository.findById(part.sparePartId);

							if (sparePart === null) {
								return new SparePartNotFoundError();
							}

							foundedPart.quantity = part.quantity;

							totalPrice += sparePart.price.value * part.quantity;

							await this.partsOrderSparePartsRepository.update(
								foundedPart.id,
								foundedPart,
							);
						}
					},
				),
			);
		} catch (error) {
			return error as InvalidPartsOrderSparePartError;
		}

		partsOrder.supplierName = normalizedSupplierName;
		partsOrder.totalPrice = totalPrice;

		const event: PartsOrderUpdatedEvent = {
			date: new Date(),
			identifier: partsOrder.id,
			type: "PARTS-ORDER_UPDATED",
			version: 1,
			data: {
				supplierName: partsOrder.supplierName,
				parts: partsOrder.parts,
			},
		};

		await this.eventStoreRepository.publish(event);

		return this.partsOrderRepository.update(partsOrder.id, partsOrder);
	}
}
