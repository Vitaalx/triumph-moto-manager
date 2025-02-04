import { type ISparePartRepository } from "@application/ports/repositories/spare-part";
import { type SparePartEntity } from "@domain/entities/spare-part";
import { Injectable } from "@nestjs/common";
import { SparePartMapper } from "../../mappers/spare-part";

@Injectable()
export class SparePartRepository implements ISparePartRepository {
	public constructor(private readonly mapper: SparePartMapper) {}

	public async findByRefNumber(refNumber: string): Promise<SparePartEntity | null> {
		const sparePart = await prisma.sparePart.findUnique({
			where: {
				refNumber: refNumber,
			},
		});

		if (sparePart === null) {
			return null;
		}

		return this.mapper.toDomainEntity(sparePart);
	}

	public async delete(sparePartId: string): Promise<void> {
		await prisma.sparePart.delete({
			where: {
				id: sparePartId,
			},
		});
	}

	public async getSpareParts(): Promise<SparePartEntity[]> {
		const spareParts = await prisma.sparePart.findMany({
			orderBy: {
				createDate: "desc",
			},
		});

		return spareParts.map((sparePart) => this.mapper.toDomainEntity(sparePart));
	}

	public async update(sparePartId: string, sparePart: SparePartEntity): Promise<void> {
		await prisma.sparePart.update({
			where: {
				id: sparePartId,
			},
			data: {
				name: sparePart.name.value,
				brand: sparePart.brand.value,
				price: sparePart.price.value,
				stock: sparePart.stock,
			},
		});
	}

	public async save(sparePart: SparePartEntity): Promise<void> {
		await prisma.sparePart.create({
			data: {
				id: sparePart.id,
				name: sparePart.name.value,
				brand: sparePart.brand.value,
				refNumber: sparePart.refNumber.value,
				price: sparePart.price.value,
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
