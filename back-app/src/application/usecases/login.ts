import { UserNotFound } from "@domain/errors/user-not-found";
import { type IUserRepository } from "../ports/repositories/user-repository";
import { type ITokenService } from "../ports/services/token-service";
import { type TokenPayload } from "@domain/models/token-payload";
import { InvalidPassword } from "@domain/errors/invalid-password";
import { type IPasswordService } from "../ports/services/password-service";

export class Login {
	public constructor(
		private readonly userRepository: IUserRepository,
		private readonly tokenService: ITokenService,
		private readonly passwordService: IPasswordService,
	) {}

	public async execute(email: string, password: string) {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			return new UserNotFound("user.notfound");
		}

		const validPassword = await this.passwordService.compare(password, user.password);

		if (!validPassword) {
			return new InvalidPassword("password.invalid");
		}

		const tokenPayload: TokenPayload = {
			id: user.id,
			roles: user.role,
		};

		return this.tokenService.generate(tokenPayload);
	}
}
