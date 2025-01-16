import { InvalidMotorcyclePriceError } from "@domain/errors/motorcycle/invalid-motorcycle-price";

export class MotorcyclePrice {
	public constructor(public readonly value: number) {}

	public static from(price: number) {
		const minimalPrice = 0;

		if (price <= minimalPrice) {
			return new InvalidMotorcyclePriceError();
		}

		return new MotorcyclePrice(price);
	}
}
