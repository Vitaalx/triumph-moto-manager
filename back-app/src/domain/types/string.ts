import { StringTooShortError } from "@domain/errors/string-too-short";

export class NormalizedString {
	public constructor(public value: string) {}

	public static from(value: string, propertyName: string) {
		const valueNormalized = value.trim();

		if (valueNormalized.length === 0) {
			return new StringTooShortError(propertyName);
		}

		return new NormalizedString(valueNormalized);
	}
}
