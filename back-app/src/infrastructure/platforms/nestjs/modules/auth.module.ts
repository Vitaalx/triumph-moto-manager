import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { AuthController } from "../controllers/auth.controller";
import { LoginQueryHandler } from "@application/queries/handlers/login.query-handler";
import { Login } from "@application/usecases/login";
import { InterfaceInjectionModule } from "./common/interface-injection.module";
import { UserRepository } from "@nestjs@repositories/user";
import { PasswordService } from "@nestjs@services/password";
import { TokenService } from "@nestjs@services/token";
import {
	PASSWORD_SERVICE_INTERFACE,
	TOKEN_SERVICE_INTERFACE,
	USER_REPOSITORY_INTERFACE,
} from "@application/ports/symbols";

const useCaseInjectionMap = [
	{
		provide: Login,
		useFactory: (
			userRepository: UserRepository,
			tokenService: TokenService,
			passwordService: PasswordService,
		) => new Login(userRepository, tokenService, passwordService),
		inject: [USER_REPOSITORY_INTERFACE, TOKEN_SERVICE_INTERFACE, PASSWORD_SERVICE_INTERFACE],
	},
];

@Module({
	imports: [
		CqrsModule,
		InterfaceInjectionModule,
	],
	controllers: [AuthController],
	providers: [
		TokenService,
		LoginQueryHandler,
		Login,
		UserRepository,
		...useCaseInjectionMap,
	],
})
export class AuthModule {}
