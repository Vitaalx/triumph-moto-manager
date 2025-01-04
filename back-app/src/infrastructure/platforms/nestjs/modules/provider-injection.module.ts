import { PASSWORD_SERVICE_INTERFACE } from "@application/ports/services/password-service";
import { TOKEN_SERVICE_INTERFACE } from "@application/ports/services/token-service";
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PasswordServiceImpl } from "@nestjs@services/password.service-impl";
import { UserRepositoryImpl } from "@nestjs@repositories/user.repository-impl";
import { USER_REPOSITORY_INTERFACE } from "@application/ports/repositories/user-repository";
import { TokenServiceImpl } from "@nestjs@services/token.service-impl";

/**
 * Permet de lier les interfaces des services et des repositories avec leurs réelles implémentations.
 */
export const dependencyInjectionProviders = [
	{
		provide: PASSWORD_SERVICE_INTERFACE,
		useClass: PasswordServiceImpl,
	},
	{
		provide: TOKEN_SERVICE_INTERFACE,
		inject: [JwtService],
		useFactory: (jwtService: JwtService) => new TokenServiceImpl(jwtService),
	},

	{
		provide: USER_REPOSITORY_INTERFACE,
		useClass: UserRepositoryImpl,
	},
];

@Module({
	providers: [...dependencyInjectionProviders],
	exports: [...dependencyInjectionProviders],
})
export class ProviderInjectionModule {
}
