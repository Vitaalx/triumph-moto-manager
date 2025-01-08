import { Injectable } from "@nestjs/common";
import { TokenService } from "./token";
import { BcryptPasswordService } from "./bcrypt-password";
import { UserRepository } from "../repositories/user";
import { PasswordInvalidHttpException } from "../../exceptions/password-invalid";
import { UserNotFoundHttpException } from "../../exceptions/user-not-found";
import { InputLoginDto } from "../../dtos/input-login";

@Injectable()
export class LoginService {
	public constructor(
		private readonly tokenService: TokenService,
		private readonly passwordService: BcryptPasswordService,
		private readonly userRepository: UserRepository,
	) {}

	public async login(inputLoginDto: InputLoginDto) {
		const user = await this.userRepository.findByEmail(inputLoginDto.email);

		if (!user) {
			throw new UserNotFoundHttpException();
		}

		const matched = await this.passwordService.compare(inputLoginDto.password, user.password);

		if (!matched) {
			throw new PasswordInvalidHttpException();
		}

		return this.tokenService.generate(
			{
				userId: user.id,
			},
		);
	}
}
