import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { AuthController } from "../controllers/auth.controller";
import { LoginQueryHandler } from "@application/queries/handlers/login.query-handler";
import { Login } from "@application/usecases/login";
import { USER_REPOSITORY_INTERFACE } from "@application/ports/repositories/user-repository";
import { ITokenService, TOKEN_SERVICE_INTERFACE } from "@application/ports/services/token-service";
import { PASSWORD_SERVICE_INTERFACE } from "@application/ports/services/password-service";
import { ProviderInjectionModule } from "./common/provider-injection.module";
import { UserRepository } from "@nestjs@repositories/user.repository-impl";
import { PasswordService } from "@nestjs@services/password.service-impl";
import { TokenService } from "@nestjs@services/token.service-impl";

const authProvidersConf = [
	{
		provide: Login,
		useFactory: (
			userRepository: UserRepository,
			tokenService: ITokenService,
			passwordService: PasswordService,
		) => new Login(userRepository, tokenService, passwordService),
		inject: [USER_REPOSITORY_INTERFACE, TOKEN_SERVICE_INTERFACE, PASSWORD_SERVICE_INTERFACE],
	},
];

@Module({
	imports: [
		CqrsModule,
		ProviderInjectionModule,
	],
	controllers: [AuthController],
	providers: [
		TokenService,
		LoginQueryHandler,
		Login,
		...authProvidersConf,
	],
})
export class AuthModule {}
