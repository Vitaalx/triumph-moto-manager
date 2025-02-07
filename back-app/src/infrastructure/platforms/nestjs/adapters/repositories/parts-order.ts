import { type IPartsOrderRepository } from "@application/ports/repositories/parts-order";
import { type PartsOrderEntity } from "@domain/entities/parts-order";
import { type PartsOrderStatus } from "@domain/types/parts-order-status";
import { Injectable } from "@nestjs/common";
import { PartsOrderMapper } from "../../mappers/parts-order";

@Injectable()
export class PartsOrderRepository implements IPartsOrderRepository {
	public constructor(private readonly mapper: PartsOrderMapper) {}

	public async save(partsOrder: PartsOrderEntity): Promise<void> {
		await prisma.partsOrder.create({
			data: {
				id: partsOrder.id,
				supplierName: partsOrder.supplierName.value,
				totalPrice: partsOrder.totalPrice,
				createDate: partsOrder.createDate,
				status: partsOrder.status,
			},
		});
	}

	public async delete(partsOrderId: string): Promise<void> {
		await prisma.partsOrder.delete({
			where: {
				id: partsOrderId,
			},
		});
	}

	public async findById(partsOrderId: string): Promise<PartsOrderEntity | null> {
		const partsOrder = await prisma.partsOrder.findUnique({
			where: {
				id: partsOrderId,
			},
			include: {
				parts: {
					include: {
						sparePart: true,
					},
				},
			},
		});

		if (partsOrder === null) {
			return null;
		}

		return this.mapper.toDomainEntity(partsOrder);
	}

	public async update(partsOrderId: string, partsOrder: PartsOrderEntity): Promise<void> {
		await prisma.partsOrder.update({
			where: {
				id: partsOrderId,
			},
			data: {
				supplierName: partsOrder.supplierName.value,
				status: partsOrder.status,
				totalPrice: partsOrder.totalPrice,
			},
		});
	}

	public async findAllByStatus(status: PartsOrderStatus): Promise<PartsOrderEntity[]> {
		const partsOrders = await prisma.partsOrder.findMany({
			where: {
				status: status,
			},
			include: {
				parts: {
					include: {
						sparePart: true,
					},
				},
			},
		});
		return partsOrders.map((partsOrder) => this.mapper.toDomainEntity(partsOrder));
	}
}
