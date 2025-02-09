import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type IMotorcycleRepository } from "@application/ports/repositories/motorcycle";
import { type IEmailService, type MaintenanceReminderMailParams } from "@application/ports/services/email-service";
import { MotorcycleNotFoundError } from "@domain/errors/motorcycle/motorcycle-not-found";
import { type MotorcycleUpdatedEvent } from "@domain/events/motorcycle/motorcycle-updated-event";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";
import { MotorcyclePrice } from "@domain/types/motorcycle-price";
import { MotorcycleYear } from "@domain/types/motorcycle-year";

export class UpdateMotorcycleUsecase {
	public constructor(
		private readonly motorcycleRepository: IMotorcycleRepository,
		private readonly eventStore: IEventStoreRepository,
		private readonly emailService: IEmailService,
	) {}

	public async execute(
		licensePlate: string,
		model: string,
		year: number,
		brand: string,
		price: number,
		maintenanceInterval: number,
		mileage: number,
		warrantyEndDate?: Date,
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

		if (
			mileage >= motorcycle.maintenanceInterval
			&& motorcycle.driver
		) {
			const maintenanceReminder: MaintenanceReminderMailParams = {
				driverFullName: motorcycle.driver.fullName.value,
				motorcycle: {
					brand: motorcycle.brand,
					model: motorcycle.model,
					year: motorcycle.year.value,
					licensePlate: motorcycle.licensePlate.value,
					currentMileage: mileage,
					maintenanceInterval: motorcycle.maintenanceInterval,
				},
			};

			const isSent = await this.emailService.sendMotorcycleMaintenanceReminder(
				maintenanceReminder,
				motorcycle.driver.email.value,
			);

			if (isSent instanceof Error) {
				return isSent;
			}

			motorcycle.maintenanceInterval *= 2;
		} else {
			motorcycle.maintenanceInterval = maintenanceInterval;
		}

		motorcycle.model = model;
		motorcycle.year = motorcycleYear;
		motorcycle.brand = brand;
		motorcycle.price = motorcyclePrice;
		motorcycle.mileage = mileage;
		motorcycle.warrantyEndDate = warrantyEndDate;

		const event: MotorcycleUpdatedEvent = {
			date: new Date(),
			identifier: motorcycle.licensePlate.value,
			type: "MOTORCYCLE_UPDATED",
			version: 1,
			data: {
				brand: motorcycle.brand,
				model: motorcycle.model,
				year: motorcycle.year,
				price: motorcycle.price,
				maintenanceInterval: motorcycle.maintenanceInterval,
				mileage: motorcycle.mileage,
				warrantyEndDate: motorcycle.warrantyEndDate,
			},
		};

		await this.eventStore.publish(event);

		return this.motorcycleRepository.updateByLicensePlate(motorcycleLicensePlate, motorcycle);
	}
}
