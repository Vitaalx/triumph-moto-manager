import { InvalidEmailError } from "@domain/errors/invalid-email-error";

export class Email {
	public constructor(public readonly value: string) {}

	public static from(value: string) {
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!emailPattern.test(value)) {
			return new InvalidEmailError();
		}
		return new Email(value);
	}
}
