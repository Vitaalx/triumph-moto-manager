export class MotorcycleAlreadyAssignedError extends Error {
	public constructor() {
		super("motorcycle.alreadyAssigned");
	}
}
