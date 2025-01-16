import { InvalidMotorcycleLicensePlateError } from "@domain/errors/motorcycle/invalid-license-plate";

export class MotorcycleLicensePlate {
	public constructor(public readonly value: string) {
	}

	public static from(licensePlate: string) {
		const licensePlatePattern = /^[A-Z]{2}-\d{3}-[A-Z]{2}/;

		if (!licensePlatePattern.test(licensePlate)) {
			return new InvalidMotorcycleLicensePlateError();
		}
		return new MotorcycleLicensePlate(licensePlate);
	}
}
