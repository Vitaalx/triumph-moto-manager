export class MotorcycleTryAlreadyExistsError extends Error {
	public constructor() {
		super("motorcycleTry.alreadyExists");
	}
}
