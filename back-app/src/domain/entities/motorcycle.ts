import { InvalidMotorcycleLicensePlateError } from "@domain/errors/motorcycle/invalid-license-plate";
import { InvalidMotorcyclePriceError } from "@domain/errors/motorcycle/invalid-motorcycle-price";
import { InvalidMotorcycleYearError } from "@domain/errors/motorcycle/invalid-motorcycle-year";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";
import { MotorcyclePrice } from "@domain/types/motorcycle-price";
import { MotorcycleYear } from "@domain/types/motorcycle-year";

export class MotorcycleEntity {
	public constructor(
		public licensePlate: MotorcycleLicensePlate,
		public brand: string,
		public model: string,
		public year: MotorcycleYear,
		public price: MotorcyclePrice,
		public maintenanceInterval: string,
	) {
	}

	public static from(
		licensePlate: string,
		brand: string,
		model: string,
		year: number,
		price: number,
		maintenanceInterval: string,
	) {
		const motorcycleLicensePlate = MotorcycleLicensePlate.from(licensePlate);

		if (motorcycleLicensePlate instanceof InvalidMotorcycleLicensePlateError) {
			return motorcycleLicensePlate;
		}

		const motorcyclePrice = MotorcyclePrice.from(price);

		if (motorcyclePrice instanceof InvalidMotorcyclePriceError) {
			return motorcyclePrice;
		}

		const motorcycleYear = MotorcycleYear.from(year);

		if (motorcycleYear instanceof InvalidMotorcycleYearError) {
			return motorcycleYear;
		}

		return new MotorcycleEntity(
			motorcycleLicensePlate,
			brand,
			model,
			motorcycleYear,
			motorcyclePrice,
			maintenanceInterval,
		);
	}
}
