import { type IMotorcycleRepository } from "@application/ports/repositories/motorcycle";
import { MotorcycleNotFoundError } from "@domain/errors/motorcycle/motorcycle-not-found";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";

export class UpdateMotorcycleMaintenanceIntervalUsecase {
	public constructor(
		private readonly motorcycleRepository: IMotorcycleRepository,
	) {}

	public async execute(
		licensePlate: string,
		maintenanceInterval: string,
	) {
		const motorcycleLicensePlate = MotorcycleLicensePlate.from(licensePlate);

		if (motorcycleLicensePlate instanceof Error) {
			return motorcycleLicensePlate;
		}

		const motorcycle = await this.motorcycleRepository.findByLicensePlate(motorcycleLicensePlate);

		if (!motorcycle) {
			return new MotorcycleNotFoundError();
		}

		motorcycle.maintenanceInterval = maintenanceInterval;

		await this.motorcycleRepository.save(motorcycle);
	}
}
