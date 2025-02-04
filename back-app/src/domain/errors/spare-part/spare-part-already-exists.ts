export class SparePartAlreadyExistsError extends Error {
	public constructor() {
		super("sparePart.sparePartAlreadyExists");
	}
}
