import { UserNotFound } from "@domain/errors/user-not-found";
import { type UserRepository } from "../ports/repositories/user-repository";
import { type TokenService } from "../ports/services/token-service";
import { type TokenPayload } from "@domain/models/token-payload";
import { InvalidPassword } from "@domain/errors/invalid-password";
import { type PasswordService } from "../ports/services/password-service";
import { Role } from "@domain/types/roles";
import { UserUnauthorized } from "@domain/errors/user-unauthorized";

export class Login {
	public constructor(
		private readonly userRepository: UserRepository,
		private readonly tokenService: TokenService,
		private readonly passwordService: PasswordService,
	) {}

	public async execute(email: string, password: string) {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			return new UserNotFound("user.notfound");
		}

		if (user.role !== Role.FLEET_MANAGER) {
			return new UserUnauthorized("role.invalid");
		}

		const validPassword = await this.passwordService.compare(password, user.password);

		if (!validPassword) {
			return new InvalidPassword("password.invalid");
		}

		const tokenPayload: TokenPayload = {
			id: user.id,
			role: user.role,
		};

		return this.tokenService.generate(tokenPayload);
	}
}
