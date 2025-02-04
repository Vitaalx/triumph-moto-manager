import { type ISparePartRepository } from "@application/ports/repositories/spare-part";

export class GetSparePartsUsecase {
	public constructor(private readonly sparePartRepository: ISparePartRepository) {}

	public async execute() {
		return this.sparePartRepository.getSpareParts();
	}
}
