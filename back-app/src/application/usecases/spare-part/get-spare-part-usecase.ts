import { type ISparePartRepository } from "@application/ports/repositories/spare-part";
import { SparePartNotFoundError } from "@domain/errors/spare-part/spare-part-not-found";

export class GetSparePartUsecase {
	public constructor(private readonly sparePartRepository: ISparePartRepository) {}

	public async execute(
		sparePartId: string,
	) {
		const sparePart = await this.sparePartRepository.findById(sparePartId);

		if (sparePart === null) {
			return new SparePartNotFoundError();
		}

		return sparePart;
	}
}
