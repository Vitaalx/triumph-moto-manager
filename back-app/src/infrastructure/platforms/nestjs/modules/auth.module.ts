import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "../controllers/auth.controller";
import { LoginQueryHandler } from "@application/queries/handlers/login.query-handler";
import { Login } from "@application/usecases/login";
import { USER_REPOSITORY_INTERFACE } from "@application/ports/repositories/user-repository";
import { TOKEN_SERVICE_INTERFACE } from "@application/ports/services/token-service";
import { PASSWORD_SERVICE_INTERFACE } from "@application/ports/services/password-service";
import { ProviderInjectionModule } from "./provider-injection.module";
import { TokenServiceImpl } from "@adapters/services/token.service-impl";
import { UserRepositoryImpl } from "@adapters/repositories/user.repository-impl";
import { PasswordServiceImpl } from "@adapters/services/password.service-impl";

const authProviders = [
	{
		provide: Login,
		useFactory: (
			userRepository: UserRepositoryImpl,
			tokenService: TokenServiceImpl,
			passwordService: PasswordServiceImpl,
		) => new Login(userRepository, tokenService, passwordService),
		inject: [USER_REPOSITORY_INTERFACE, TOKEN_SERVICE_INTERFACE, PASSWORD_SERVICE_INTERFACE],
	},
];

@Module({
	imports: [
		CqrsModule,
		JwtModule.register({
			global: true,
		}),
		ProviderInjectionModule,
	],
	controllers: [AuthController],
	providers: [
		LoginQueryHandler,
		Login,
		...authProviders,
	],
})
export class AuthModule {}
