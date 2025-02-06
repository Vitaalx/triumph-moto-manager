export class PartsOrderNotFoundError extends Error {
	public constructor() {
		super("partsOrder.notFound");
	}
}
