import { InvalidNumber } from "@domain/errors/invalid-number";

export class PositiveNumber {
	public constructor(public readonly value: number) {
	}

	public static from(value: number) {
		if (value <= 0) {
			return new InvalidNumber();
		}

		return new PositiveNumber(value);
	}
}
