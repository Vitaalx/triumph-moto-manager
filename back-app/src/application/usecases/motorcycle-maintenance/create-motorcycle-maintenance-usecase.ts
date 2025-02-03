import { type IDriverRepository } from "@application/ports/repositories/driver";
import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type IMotorcycleRepository } from "@application/ports/repositories/motorcycle";
import { type IMotorcycleMaintenanceRepository } from "@application/ports/repositories/motorcycle-maintenance";
import { MotorcycleMaintenanceEntity } from "@domain/entities/motorcycle-maintenance";
import { DriverNotFoundError } from "@domain/errors/driver/driver-not-found";
import { MotorcycleDoesNotBelongToDriverError } from "@domain/errors/motorcycle-maintenance/motorcycle-does-not-belong-to-driver";
import { MotorcycleMaintenanceAlreadyExistsError } from "@domain/errors/motorcycle-maintenance/motorcycle-maintenance-already-exists";
import { MotorcycleNotFoundError } from "@domain/errors/motorcycle/motorcycle-not-found";
import { type MotorcycleMaintenanceCreatedEvent } from "@domain/events/motorcycle-maintenance/motorcycle-maintenance-created-event";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";

export class CreateMotorcycleMaintenanceUsecase {
	public constructor(
		private readonly motorcycleMaintenanceRepository: IMotorcycleMaintenanceRepository,
		private readonly driverRepository: IDriverRepository,
		private readonly motorcycleRepositrory: IMotorcycleRepository,
		private readonly eventStoreRepository: IEventStoreRepository,
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

		const motorcycle = await this.motorcycleRepositrory.findByLicensePlate(motorcycleLicensePlate);

		if (motorcycle === null) {
			return new MotorcycleNotFoundError();
		}

		const driverMotorcycleLicensePlates = driver.motorcycles.map((motorcycle) => motorcycle.licensePlate.value);

		if (!driverMotorcycleLicensePlates.includes(motorcycleLicensePlate.value)) {
			return new MotorcycleDoesNotBelongToDriverError();
		}

		const motorcycleMaintenanceExists = await this.motorcycleMaintenanceRepository.findByLicensePlateAndStatus(
			motorcycleLicensePlate,
			"IN_PROGRESS",
		);

		if (motorcycleMaintenanceExists !== null) {
			return new MotorcycleMaintenanceAlreadyExistsError();
		}

		const motorcycleMaintenance = MotorcycleMaintenanceEntity.create(
			driver.id,
			motorcycleLicensePlate.value,
		);

		if (motorcycleMaintenance instanceof Error) {
			return motorcycleMaintenance;
		}

		const event: MotorcycleMaintenanceCreatedEvent = {
			date: new Date(),
			identifier: motorcycleMaintenance.id,
			type: "MOTORCYCLE-MAINTENANCE_CREATED",
			version: 1,
			data: {
				driverId: driver.id,
				motorcycleId: motorcycleLicensePlate,
			},
		};

		await this.eventStoreRepository.publish(event);

		return this.motorcycleMaintenanceRepository.save(motorcycleMaintenance);
	}
}
