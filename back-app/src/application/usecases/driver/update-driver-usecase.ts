import { type IDriverRepository } from "@application/ports/repositories/driver";
import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { DriverNotFoundError } from "@domain/errors/driver/driver-not-found";
import { InvalidDriverAgeError } from "@domain/errors/driver/invalid-driver-age";
import { InvalidDriverMotorcycleLicenseTypeError } from "@domain/errors/driver/invalid-driver-motorcycle-license-type";
import { InvalidEmailError } from "@domain/errors/invalid-email-error";
import { type DriverUpdatedEvent } from "@domain/events/driver/driver-updated-event";
import { DriverAge } from "@domain/types/driver-age";
import { DriverMotorcycleLicenseType } from "@domain/types/driver-motorcycle-license-type";
import { Email } from "@domain/types/email";

export class UpdateDriverUsecase {
	public constructor(
		private readonly driverRepository: IDriverRepository,
		private readonly eventStore: IEventStoreRepository,
	) {}

	public async execute(
		driverId: string,
		age: number,
		email: string,
		motorcycleLicenseType: string,
		drivingExperience: string,
	) {
		const driverMotorcycleLicenseType = DriverMotorcycleLicenseType.from(motorcycleLicenseType);

		if (driverMotorcycleLicenseType instanceof InvalidDriverMotorcycleLicenseTypeError) {
			return driverMotorcycleLicenseType;
		}

		const driverAge = DriverAge.from(age, driverMotorcycleLicenseType);

		if (driverAge instanceof InvalidDriverAgeError) {
			return driverAge;
		}

		const driverEmail = Email.from(email);

		if (driverEmail instanceof InvalidEmailError) {
			return driverEmail;
		}

		const driver = await this.driverRepository.findById(driverId);

		if (!driver) {
			return new DriverNotFoundError();
		}

		driver.age = driverAge;
		driver.motorcycleLicenseType = driverMotorcycleLicenseType;
		driver.drivingExperience = drivingExperience;
		driver.email = driverEmail;

		const event: DriverUpdatedEvent = {
			date: new Date(),
			identifier: driver.id,
			type: "DRIVER_UPDATED",
			version: 1,
			data: {
				email: driver.email.value,
				age: driver.age.value,
				motorcycleLicenseType: driver.motorcycleLicenseType.value,
				drivingExperience: driver.drivingExperience,
			},
		};

		await this.eventStore.publish(event);

		await this.driverRepository.updateById(driverId, driver);
	}
}
