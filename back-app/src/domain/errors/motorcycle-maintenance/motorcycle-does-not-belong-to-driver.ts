export class MotorcycleDoesNotBelongToDriverError extends Error {
	public constructor() {
		super("motorcycleMaintenance.motorcycleDoesNotBelongToDriver");
	}
}
