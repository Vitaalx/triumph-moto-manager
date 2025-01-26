import { type IDriverRepository } from "@application/ports/repositories/driver";
import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { DriverSheetEntity } from "@domain/entities/driver-sheet";
import { DriverAlreadyExistError } from "@domain/errors/driver/driver-already-exist";
import { type DriverCreatedEvent } from "@domain/events/driver/driver-created-event";

export class CreateDriverUsecase {
	public constructor(
		private readonly driverRepository: IDriverRepository,
		private readonly eventStore: IEventStoreRepository,
	) {}

	public async execute(
		name: string,
		firstname: string,
		age: number,
		email: string,
		motorcycleLicenseType: string,
		drivingExperience: string,
	) {
		const driverSheet = DriverSheetEntity.from(
			name,
			firstname,
			email,
			age,
			motorcycleLicenseType,
			drivingExperience,
		);

		if (driverSheet instanceof Error) {
			return driverSheet;
		}

		const driverExist = await this.driverRepository.findByEmail(driverSheet.email);

		if (driverExist) {
			return new DriverAlreadyExistError();
		}

		const event: DriverCreatedEvent = {
			date: new Date(),
			identifier: driverSheet.id,
			type: "DRIVER_CREATED",
			version: 1,
			data: {
				fullName: driverSheet.fullName,
				age: driverSheet.age.value,
				email: driverSheet.email,
				motorcycleLicenseType: driverSheet.motorcycleLicenseType,
				drivingExperience: driverSheet.drivingExperience,
			},
		};

		await this.eventStore.publish(event);

		return this.driverRepository.save(driverSheet);
	}
}
