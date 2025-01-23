import { type IDriverRepository } from "@application/ports/repositories/driver";
import { DriverNotFoundError } from "@domain/errors/driver/driver-not-found";

export class GetDriverUseCase {
	public constructor(
		private driverRepository: IDriverRepository,
	) {}

	public async execute(driverId: string) {
		const driver = await this.driverRepository.findById(driverId);

		if (driver === null) {
			return new DriverNotFoundError();
		}

		return driver;
	}
}
