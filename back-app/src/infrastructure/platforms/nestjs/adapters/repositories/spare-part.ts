import { type ISparePartRepository } from "@application/ports/repositories/spare-part";
import { type SparePartEntity } from "@domain/entities/spare-part";
import { Injectable } from "@nestjs/common";
import { SparePartMapper } from "../../mappers/spare-part";

@Injectable()
export class SparePartRepository implements ISparePartRepository {
	public constructor(private readonly mapper: SparePartMapper) {}

	public async update(sparePartId: string, sparePart: SparePartEntity): Promise<void> {
		console.log(sparePart);
		await prisma.sparePart.update({
			where: {
				id: sparePartId,
			},
			data: {
				name: sparePart.name,
				brand: sparePart.brand,
				price: sparePart.price,
				stock: sparePart.stock,
			},
		});
	}

	public async save(sparePart: SparePartEntity): Promise<void> {
		await prisma.sparePart.create({
			data: {
				id: sparePart.id,
				name: sparePart.name,
				brand: sparePart.brand,
				price: sparePart.price,
				stock: sparePart.stock,
			},
		});
	}

	public async findById(id: string): Promise<SparePartEntity | null> {
		const sparePart = await prisma.sparePart.findUnique({
			where: {
				id,
			},
		});

		if (sparePart === null) {
			return null;
		}

		return this.mapper.toDomainEntity(sparePart);
	}
}
