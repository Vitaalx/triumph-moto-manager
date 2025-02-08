import { SparePartNotFoundError } from "@domain/errors/spare-part/spare-part-not-found";
import { type ISparePartRepository } from "../repositories/spare-part";
import { InsufficientSparePartStockError } from "@domain/errors/spare-part/insufficient-spare-part-stock";
import { type SparePartEntity } from "@domain/entities/spare-part";

export class SparePartService {
	public constructor(
		private readonly sparePartRepository: ISparePartRepository,
	) {}

	public async checkStock(sparePartId: string, quantity: number) {
		const sparePart = await this.sparePartRepository.findById(sparePartId);

		if (sparePart === null) {
			return new SparePartNotFoundError();
		}

		if (sparePart.stock === 0 || sparePart.stock < quantity) {
			return new InsufficientSparePartStockError(sparePart.id);
		}

		return sparePart;
	}
}
