import { type IMotorcycleTryRepository } from "@application/ports/repositories/motorcycle-try";

export class GetMotorcyclesTrialPassedUsecase {
	public constructor(private readonly motorcycleTryRepository: IMotorcycleTryRepository) {}

	public async execute() {
		return this.motorcycleTryRepository.getMotorcyclesTrialPassed();
	}
}
