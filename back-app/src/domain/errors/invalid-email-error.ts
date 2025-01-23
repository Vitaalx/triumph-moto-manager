export class InvalidEmailError extends Error {
	public constructor() {
		super("email.invalid");
	}
}
