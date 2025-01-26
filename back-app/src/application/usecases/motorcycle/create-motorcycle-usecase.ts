import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type IMotorcycleRepository } from "@application/ports/repositories/motorcycle";
import { MotorcycleEntity } from "@domain/entities/motorcycle";
import { MotorcycleAlreadyExistsError } from "@domain/errors/motorcycle/motorcycle-already-exists";
import { type MotorcycleCreatedEvent } from "@domain/events/motorcycle/motorcycle-created-event";

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

		if (motorcycle instanceof Error) {
			return motorcycle;
		}

		const motorcycleExists = await this.motorcycleRepository.findByLicensePlate(motorcycle.licensePlate);

		if (motorcycleExists) {
			return new MotorcycleAlreadyExistsError();
		}

		const event: MotorcycleCreatedEvent = {
			date: new Date(),
			identifier: motorcycle.licensePlate.value,
			type: "MOTORCYCLE_CREATED",
			version: 1,
			data: {
				licensePlate: motorcycle.licensePlate,
				brand: motorcycle.brand,
				model: motorcycle.model,
				year: motorcycle.year,
				price: motorcycle.price,
				maintenanceInterval: motorcycle.maintenanceInterval,
			},
		};

		await this.eventStore.publish(event);

		return this.motorcycleRepository.save(motorcycle);
	}
}
