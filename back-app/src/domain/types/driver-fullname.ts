import { FirstNameTooShortError } from "@domain/errors/driver/first-name-too-short";
import { LastNameTooShortError } from "@domain/errors/driver/last-name-too-short";

export class DriverFullName {
	public constructor(
		public readonly value: string,
	) {}

	public static from(
		firstName: string,
		lastName: string,
	) {
		const firstNameNormalized = firstName.trim();
		const lastNameNormalized = lastName.trim();

		if (firstNameNormalized.length < 3) {
			return new FirstNameTooShortError();
		}

		if (lastNameNormalized.length < 3) {
			return new LastNameTooShortError();
		}

		return new DriverFullName(`${firstName} ${lastName}`);
	}
}
