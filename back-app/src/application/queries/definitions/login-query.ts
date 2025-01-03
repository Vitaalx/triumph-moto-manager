import { type InvalidPassword } from "@domain/errors/invalid-password";
import { type UserNotFound } from "@domain/errors/user-not-found";
import { Query } from "@nestjs-architects/typed-cqrs";

export class LoginQuery extends Query<string | UserNotFound | InvalidPassword> {
	public constructor(public readonly email: string, public readonly password: string) {
		super();
	}
}
