export class InvalidPassword extends Error {
	public constructor(message: string) {
		super(message);
	}
}
