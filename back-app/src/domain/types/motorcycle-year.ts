import { InvalidMotorcycleYearError } from "@domain/errors/motorcycle/invalid-motorcycle-year";

export class MotorcycleYear {
	public constructor(public readonly value: number) {}

	public static from(year: number) {
		const currentYear = new Date().getFullYear();

		if (year > currentYear) {
			return new InvalidMotorcycleYearError();
		}

		return new MotorcycleYear(year);
	}
}
