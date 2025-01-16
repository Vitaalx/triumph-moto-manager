import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type IMotorcycleRepository } from "@application/ports/repositories/motorcycle";
import { MotorcycleNotFoundError } from "@domain/errors/motorcycle/motorcycle-not-found";
import { type MotorcycleDeletedEvent } from "@domain/events/motorcycle/motorcycle-deleted-event";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";

export class DeleteMotorcycleUsecase {
	public constructor(
		private readonly motorcycleRepository: IMotorcycleRepository,
		private readonly eventStoreRepository: IEventStoreRepository,
	) {}

	public async execute(licensePlate: string) {
		const motorcycleLicensePlate = MotorcycleLicensePlate.from(licensePlate);

		if (motorcycleLicensePlate instanceof Error) {
			return motorcycleLicensePlate;
		}

		const motorcycle = await this.motorcycleRepository.findByLicensePlate(motorcycleLicensePlate);

		if (motorcycle === null) {
			return new MotorcycleNotFoundError();
		}

		const event: MotorcycleDeletedEvent = {
			date: new Date(),
			identifier: motorcycle.licensePlate.value,
			type: "MOTORCYCLE_DELETED",
			version: 1,
			data: {
				licensePlate: motorcycle.licensePlate.value,
				brand: motorcycle.brand,
				model: motorcycle.model,
				year: motorcycle.year.value,
				price: motorcycle.price.value,
				maintenanceInterval: motorcycle.maintenanceInterval,
			},
		};

		await this.eventStoreRepository.publish(event);

		await this.motorcycleRepository.delete(motorcycleLicensePlate);
	}
}
