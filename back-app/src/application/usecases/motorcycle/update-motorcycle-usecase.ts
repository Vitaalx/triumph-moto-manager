import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type IMotorcycleRepository } from "@application/ports/repositories/motorcycle";
import { MotorcycleNotFoundError } from "@domain/errors/motorcycle/motorcycle-not-found";
import { type MotorcycleUpdatedEvent } from "@domain/events/motorcycle/motorcycle-updated-event";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";
import { MotorcyclePrice } from "@domain/types/motorcycle-price";
import { MotorcycleYear } from "@domain/types/motorcycle-year";

export class UpdateMotorcycleUsecase {
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
		const motorcycleLicensePlate = MotorcycleLicensePlate.from(licensePlate);

		if (motorcycleLicensePlate instanceof Error) {
			return motorcycleLicensePlate;
		}

		const motorcycleYear = MotorcycleYear.from(year);

		if (motorcycleYear instanceof Error) {
			return motorcycleYear;
		}

		const motorcyclePrice = MotorcyclePrice.from(price);

		if (motorcyclePrice instanceof Error) {
			return motorcyclePrice;
		}

		const motorcycle = await this.motorcycleRepository.findByLicensePlate(motorcycleLicensePlate);

		if (!motorcycle) {
			return new MotorcycleNotFoundError();
		}

		motorcycle.model = model;
		motorcycle.year = motorcycleYear;
		motorcycle.brand = brand;
		motorcycle.price = motorcyclePrice;
		motorcycle.maintenanceInterval = maintenanceInterval;

		const event: MotorcycleUpdatedEvent = {
			date: new Date(),
			identifier: motorcycle.licensePlate.value,
			type: "MOTORCYCLE_UPDATED",
			version: 1,
			data: {
				brand: motorcycle.brand,
				model: motorcycle.model,
				year: motorcycle.year.value,
				price: motorcycle.price.value,
				maintenanceInterval: motorcycle.maintenanceInterval,
			},
		};

		await this.eventStore.publish(event);

		await this.motorcycleRepository.updateByLicensePlate(motorcycleLicensePlate, motorcycle);
	}
}
