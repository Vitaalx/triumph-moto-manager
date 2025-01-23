import { InvalidDriverMotorcycleLicenseTypeError } from "@domain/errors/driver/invalid-driver-motorcycle-license-type";

export class DriverMotorcycleLicenseType {
	public constructor(
		public readonly value: string,
	) {}

	public static from(value: string) {
		const motorcycleLicenseType = [
			"A",
			"A2",
			"A1",
		];
		if (!motorcycleLicenseType.includes(value)) {
			return new InvalidDriverMotorcycleLicenseTypeError();
		}
		return new DriverMotorcycleLicenseType(value);
	}
}
