export class InvalidSparePartPriceError extends Error {
	public constructor() {
		super("sparePart.invalidPrice");
	}
}
