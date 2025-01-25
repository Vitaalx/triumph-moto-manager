export class DriverAlreadyExistError extends Error {
	public constructor() {
		super("driver.alreadyExists");
	}
}
