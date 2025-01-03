export class UserNotFound extends Error {
	public constructor(message: string) {
		super(message);
	}
}
