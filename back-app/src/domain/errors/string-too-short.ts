export class StringTooShortError extends Error {
	public constructor(public propertyName: string) {
		super(`${propertyName}.tooShort`);
	}
}
