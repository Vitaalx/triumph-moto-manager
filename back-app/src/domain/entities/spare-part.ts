import { SparePartPrice } from "@domain/types/spare-part-price";
import { NormalizedString } from "@domain/types/string";
import { randomUUID } from "crypto";

export class SparePartEntity {
	public constructor(
		public id: string,
		public name: NormalizedString,
		public brand: NormalizedString,
		public refNumber: NormalizedString,
		public stock: number,
		public price: SparePartPrice,
	) {
	}

	public static from(
		name: string,
		brand: string,
		refNumber: string,
		stock: number,
		price: number,
	) {
		const sparePartPrice = SparePartPrice.from(price);
		const sparePartName = NormalizedString.from(name, "name");
		const sparePartBrand = NormalizedString.from(brand, "brand");
		const sparePartRefNumber = NormalizedString.from(refNumber, "refNumber");

		if (sparePartName instanceof Error) {
			return sparePartName;
		}

		if (sparePartBrand instanceof Error) {
			return sparePartBrand;
		}

		if (sparePartRefNumber instanceof Error) {
			return sparePartRefNumber;
		}

		if (sparePartPrice instanceof Error) {
			return sparePartPrice;
		}

		return new SparePartEntity(
			randomUUID(),
			sparePartName,
			sparePartBrand,
			sparePartRefNumber,
			stock,
			sparePartPrice,
		);
	}
}
