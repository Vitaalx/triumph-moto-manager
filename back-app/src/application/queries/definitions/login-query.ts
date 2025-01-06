import { type Login } from "@application/usecases/login";
import { Query } from "@nestjs-architects/typed-cqrs";

export class LoginQuery extends Query<ReturnType<Login["execute"]>> {
	public constructor(public readonly email: string, public readonly password: string) {
		super();
	}
}
