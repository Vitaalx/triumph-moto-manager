import { InvalidDriverAgeError } from "@domain/errors/driver/invalid-driver-age";
import { type DriverMotorcycleLicenseType } from "./driver-motorcycle-license-type";

export class DriverAge {
	public constructor(
		public readonly value: number,
	) {}

	public static from(value: number, licenseType: DriverMotorcycleLicenseType) {
		if (value <= 0) {
			return new InvalidDriverAgeError("driver.ageMustBeGreaterThanZero");
		}
		if (licenseType.value === "A1" && value < 16) {
			return new InvalidDriverAgeError("driver.ageMustBeGreaterThanSixteen");
		}
		if (licenseType.value === "A2" && value < 18) {
			return new InvalidDriverAgeError("driver.ageMustBeGreaterThanEighteen");
		}
		if (licenseType.value === "A" && value < 20) {
			return new InvalidDriverAgeError("driver.ageMustBeGreaterThanTwenty");
		}
		return new DriverAge(value);
	}
}
