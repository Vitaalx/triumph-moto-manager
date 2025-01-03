import { QueryHandler, type IQueryHandler } from "@nestjs/cqrs";
import { LoginQuery } from "../definitions/login-query";
import { Login } from "src/application/usecases/login";

@QueryHandler(LoginQuery)
export class LoginQueryHandler implements IQueryHandler<LoginQuery> {
	public constructor(private readonly login: Login) {}

	public async execute(query: LoginQuery) {
		const token = await this.login.execute(query.email, query.password);
		return token;
	}
}
