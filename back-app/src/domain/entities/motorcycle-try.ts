import { InvalidMotorcycleTryDatesError } from "@domain/errors/motorcycle-try/invalid-motorcycle-try-dates";
import { type MotorcycleLicensePlate } from "@domain/types/license-plate";
import { randomUUID } from "crypto";

export class MotorcycleTryEntity {
	public constructor(
		public id: string,
		public driverId: string,
		public motorcycleId: MotorcycleLicensePlate,
		public startDate: Date,
		public endDate: Date,
	) {
	}

	public static from(
		driverId: string,
		motorcycleId: MotorcycleLicensePlate,
		startDate: Date,
		endDate: Date,
	) {
		if (startDate.getTime() > endDate.getTime()) {
			return new InvalidMotorcycleTryDatesError();
		}
		return new MotorcycleTryEntity(
			randomUUID(),
			driverId,
			motorcycleId,
			startDate,
			endDate,
		);
	}
}
