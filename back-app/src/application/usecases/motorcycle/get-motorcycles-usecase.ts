import { type IMotorcycleRepository } from "@application/ports/repositories/motorcycle";

export class GetMotorcyclesUsecase {
	public constructor(private readonly motorcycleRepository: IMotorcycleRepository) {}

	public async execute() {
		const motorcycle = await this.motorcycleRepository.getMotorcycles();
		return motorcycle;
	}
}
