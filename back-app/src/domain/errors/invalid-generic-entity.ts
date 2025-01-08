export class InvalidGenericEntity extends Error {
	public constructor(inputError: string, message: string) {
		super(message);
		this.name = inputError;
	}
}
