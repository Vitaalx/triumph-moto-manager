export class DriverNotFoundError extends Error {
	public constructor() {
		super("driver.notfound");
	}
}
