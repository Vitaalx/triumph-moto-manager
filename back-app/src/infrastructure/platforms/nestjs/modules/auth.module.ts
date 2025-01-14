import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "../controllers/auth.controller";
import { UserRepository } from "@nestjs@repositories/user";
import { TokenService } from "@nestjs@services/token";
import { LoginService } from "../adapters/services/login";
import { BcryptPasswordService } from "../adapters/services/bcrypt-password";

@Module({
	imports: [
		CqrsModule,
		JwtModule.register({
			global: true,
		}),
	],
	controllers: [AuthController],
	providers: [
		LoginService,
		BcryptPasswordService,
		TokenService,
		UserRepository,
	],
	exports: [TokenService, UserRepository],
})
export class AuthModule {}
