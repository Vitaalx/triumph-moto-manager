import { UserNotFound } from "@domain/errors/user-not-found";
import { type IUserRepository } from "../ports/repositories/user";
import { type ITokenService } from "../ports/services/token";
import { type TokenPayload } from "@domain/models/token-payload";
import { PasswordInvalid } from "@domain/errors/password-invalid";
import { type IPasswordService } from "../ports/services/password";

export class Login {
	public constructor(
		private readonly userRepository: IUserRepository,
		private readonly tokenService: ITokenService,
		private readonly passwordService: IPasswordService,
	) {}

	public async execute(email: string, password: string) {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			return new UserNotFound();
		}

		const validPassword = await this.passwordService.compare(password, user.password);

		if (!validPassword) {
			return new PasswordInvalid();
		}

		const tokenPayload: TokenPayload = {
			userId: user.id,
		};

		return this.tokenService.generate(tokenPayload);
	}
}
