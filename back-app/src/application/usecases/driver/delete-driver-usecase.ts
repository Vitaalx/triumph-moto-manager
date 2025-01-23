import { type IDriverRepository } from "@application/ports/repositories/driver";
import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { DriverNotFoundError } from "@domain/errors/driver/driver-not-found";
import { type DriverDeletedEvent } from "@domain/events/driver/driver-deleted-event";

export class DeleteDriverUsecase {
	public constructor(
		private readonly driverRepository: IDriverRepository,
		private readonly eventStore: IEventStoreRepository,
	) {}

	public async execute(driverId: string) {
		const driver = await this.driverRepository.findById(driverId);

		if (driver === null) {
			return new DriverNotFoundError();
		}

		const event: DriverDeletedEvent = {
			date: new Date(),
			identifier: driver.id,
			type: "DRIVER_DELETED",
			version: 1,
			data: {
				fullName: driver.fullName.value,
				age: driver.age.value,
				motorcycleLicenseType: driver.motorcycleLicenseType.value,
				drivingExperience: driver.drivingExperience,
			},
		};

		await this.eventStore.publish(event);

		await this.driverRepository.delete(driver);
	}
}
