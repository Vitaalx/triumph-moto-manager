import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type IMotorcycleRepository } from "@application/ports/repositories/motorcycle";
import { MotorcycleEntity } from "@domain/entities/motorcycle";
import { InvalidLicensePlateError } from "@domain/errors/motorcycle/invalid-license-plate";
import { InvalidMotorcyclePriceError } from "@domain/errors/motorcycle/invalid-motorcycle-price";
import { InvalidMotorcycleYearError } from "@domain/errors/motorcycle/invalid-motorcycle-year";
import { MotorcycleAlreadyExistsError } from "@domain/errors/motorcycle/motorcycle-already-exists";
import { MotorcycleCreatedEvent } from "@domain/events/motorcycle-created-event";
import { randomUUID } from "crypto";

export class CreateMotorcycleUsecase {
	public constructor(
		private readonly motorcycleRepository: IMotorcycleRepository,
		private readonly eventStore: IEventStoreRepository,
	) {}

	public async execute(
		licensePlate: string,
		model: string,
		year: number,
		brand: string,
		price: number,
		maintenanceInterval: string,
	) {
		const motorcycle = MotorcycleEntity.from(
			licensePlate,
			brand,
			model,
			year,
			price,
			maintenanceInterval,
		);

		if (motorcycle instanceof InvalidLicensePlateError) {
			return motorcycle;
		}

		if (motorcycle instanceof InvalidMotorcycleYearError) {
			return motorcycle;
		}

		if (motorcycle instanceof InvalidMotorcyclePriceError) {
			return motorcycle;
		}

		const motorcycleExists = await this.motorcycleRepository.findByLicensePlate(motorcycle.licensePlate);

		if (motorcycleExists) {
			return new MotorcycleAlreadyExistsError();
		}

		await this.eventStore.publish(
			new MotorcycleCreatedEvent(
				{
					identifier: randomUUID(),
					licensePlate: motorcycle.licensePlate.value,
					brand: motorcycle.brand,
					model: motorcycle.model,
					year: motorcycle.year.value,
					price: motorcycle.price.value,
					maintenanceInterval: motorcycle.maintenanceInterval,
				},
			),
		);

		await this.motorcycleRepository.save(motorcycle);
	}
}
