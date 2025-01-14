export class MotorcycleAlreadyExistsError extends Error {
	public constructor() {
		super("motorcycle.alreadyExists");
	}
}
