import { type IDriverRepository } from "@application/ports/repositories/driver";
import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type IMotorcycleRepository } from "@application/ports/repositories/motorcycle";
import { type IMotorcycleTryRepository } from "@application/ports/repositories/motorcycle-try";
import { MotorcycleTryEntity } from "@domain/entities/motorcycle-try";
import { DriverNotFoundError } from "@domain/errors/driver/driver-not-found";
import { MotorcycleTryAlreadyExistsError } from "@domain/errors/motorcycle-try/motorcyce-try-already-exists";
import { MotorcycleNotFoundError } from "@domain/errors/motorcycle/motorcycle-not-found";
import { type MotorcycleTryCreatedEvent } from "@domain/events/motorcycle-try/motorcycle-try-created-event";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";

export class CreateMotorcycleTryUsecase {
	public constructor(
		private readonly motorcycleTryRepository: IMotorcycleTryRepository,
		private readonly motorcycleRepository: IMotorcycleRepository,
		private readonly driverRepository: IDriverRepository,
		private readonly eventStoreRepository: IEventStoreRepository,
	) {
	}

	public async execute(
		driverId: string,
		motorcycleId: string,
		startDate: Date,
		endDate: Date,
	) {
		const motorcycleLicensePlate = MotorcycleLicensePlate.from(motorcycleId);

		if (motorcycleLicensePlate instanceof Error) {
			return motorcycleLicensePlate;
		}

		const driver = await this.driverRepository.findById(driverId);

		if (!driver) {
			return new DriverNotFoundError();
		}

		const motorcycle = await this.motorcycleRepository.findByLicensePlate(motorcycleLicensePlate);

		if (!motorcycle) {
			return new MotorcycleNotFoundError();
		}

		const motorcycleTryCheck = await this.motorcycleTryRepository.getMotorcycleTryByDriverIdAndMotorcycleId(
			driverId,
			motorcycleLicensePlate,
			startDate,
			endDate,
		);

		if (motorcycleTryCheck) {
			return new MotorcycleTryAlreadyExistsError();
		}

		const motorcycleTry = MotorcycleTryEntity.from(
			driverId,
			motorcycleLicensePlate,
			startDate,
			endDate,
		);

		if (motorcycleTry instanceof Error) {
			return motorcycleTry;
		}

		const event: MotorcycleTryCreatedEvent = {
			date: new Date(),
			identifier: motorcycleTry.id,
			type: "MOTORCYCLE-TRY_CREATED",
			version: 1,
			data: {
				driverId: motorcycleTry.driverId,
				motorcycleId: motorcycleTry.motorcycleId,
				startDate: motorcycleTry.startDate,
				endDate: motorcycleTry.endDate,
			},
		};

		await this.eventStoreRepository.publish(event);

		return this.motorcycleTryRepository.save(motorcycleTry);
	}
}
