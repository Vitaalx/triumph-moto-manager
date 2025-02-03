export class SparePartNotFoundError extends Error {
	public constructor() {
		super("sparePart.notFound");
	}
}
