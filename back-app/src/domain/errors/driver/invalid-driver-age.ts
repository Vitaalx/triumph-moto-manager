export class InvalidDriverAgeError extends Error {
	public constructor(public message: string) {
		super(message);
	}
}
