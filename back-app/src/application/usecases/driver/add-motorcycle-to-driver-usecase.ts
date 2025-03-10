import { type IDriverRepository } from "@application/ports/repositories/driver";
import { type IMotorcycleRepository } from "@application/ports/repositories/motorcycle";
import { DriverNotFoundError } from "@domain/errors/driver/driver-not-found";
import { MotorcycleAlreadyAssignedError } from "@domain/errors/motorcycle/motorcycle-already-assigned";
import { MotorcycleNotFoundError } from "@domain/errors/motorcycle/motorcycle-not-found";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";

export class AddMotorcycleToDriverUsecase {
	public constructor(
		private readonly driverRepository: IDriverRepository,
		private readonly motorcycleRepository: IMotorcycleRepository,
	) {}

	public async execute(driverId: string, motorcycleId: string) {
		const driver = await this.driverRepository.findById(driverId);

		if (driver === null) {
			return new DriverNotFoundError();
		}

		const motorcycleLicensePlate = MotorcycleLicensePlate.from(motorcycleId);

		if (motorcycleLicensePlate instanceof Error) {
			return motorcycleLicensePlate;
		}

		const motorcycle = await this.motorcycleRepository.findByLicensePlate(motorcycleLicensePlate);

		if (motorcycle === null) {
			return new MotorcycleNotFoundError();
		}

		if (motorcycle.hasDriver()) {
			return new MotorcycleAlreadyAssignedError();
		}

		motorcycle.driver = driver;

		return this.motorcycleRepository.updateByLicensePlate(motorcycleLicensePlate, motorcycle);
	}
}
