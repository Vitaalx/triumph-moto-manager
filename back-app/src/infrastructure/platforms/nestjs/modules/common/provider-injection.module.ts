import { PASSWORD_SERVICE_INTERFACE } from "@application/ports/services/password-service";
import { TOKEN_SERVICE_INTERFACE } from "@application/ports/services/token-service";
import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PasswordService } from "@nestjs@services/password.service-impl";
import { UserRepository } from "@nestjs@repositories/user.repository-impl";
import { USER_REPOSITORY_INTERFACE } from "@application/ports/repositories/user-repository";
import { TokenService } from "../../adapters/services/token.service-impl";

/**
 * Permet de lier les interfaces des services et des repositories avec leurs réelles implémentations.
 */
export const dependencyInjectionProviders = [
	{
		provide: PASSWORD_SERVICE_INTERFACE,
		useClass: PasswordService,
	},

	{
		provide: TOKEN_SERVICE_INTERFACE,
		inject: [JwtService],
		useFactory: (jwtService: JwtService) => new TokenService(jwtService),
	},

	{
		provide: USER_REPOSITORY_INTERFACE,
		useClass: UserRepository,
	},
];

@Module({
	imports: [
		JwtModule.register({
			global: true,
		}),
	],
	providers: [...dependencyInjectionProviders],
	exports: [...dependencyInjectionProviders],
})
export class ProviderInjectionModule {
}
