import { type IPartsOrderSparePartsRepository } from "@application/ports/repositories/parts-order-spare-parts";
import { type PartsOrderSparePartEntity } from "@domain/entities/parts-order-spare-parts";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PartsOrderSparePartsRepository implements IPartsOrderSparePartsRepository {
	public async save(partsOrderSparePart: PartsOrderSparePartEntity): Promise<void> {
		console.log("PartsOrderSpareParts save");
		await prisma.partsOrderSparePart.create({
			data: {
				id: partsOrderSparePart.id,
				partsOrderId: partsOrderSparePart.partsOrderId,
				sparePartId: partsOrderSparePart.sparePartId,
				quantity: partsOrderSparePart.quantity,
			},
		});
	}

	public async update(partsOrderSparePartId: string, partsOrderSparePart: PartsOrderSparePartEntity): Promise<void> {
		await prisma.partsOrderSparePart.update({
			where: {
				id: partsOrderSparePartId,
			},
			data: {
				quantity: partsOrderSparePart.quantity,
			},
		});
	}
}
