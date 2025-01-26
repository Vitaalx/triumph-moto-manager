import { type IMotorcycleTryRepository } from "@application/ports/repositories/motorcycle-try";

export class GetMotorcyclesTrialCommingUsecase {
	public constructor(private readonly motorcycleTryRepository: IMotorcycleTryRepository) {}

	public async execute() {
		return this.motorcycleTryRepository.getMotorcyclesTrialComming();
	}
}
