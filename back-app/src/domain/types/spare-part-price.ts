import { InvalidSparePartPriceError } from "@domain/errors/spare-part/invalid-spare-part-price";

export class SparePartPrice {
	public constructor(
		public value: number,
	) {
	}

	public static from(value: number) {
		if (value <= 0) {
			return new InvalidSparePartPriceError();
		}
		return new SparePartPrice(value);
	}
}
