import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";

import { PasswordService } from "@nestjs@services/password";
import { UserRepository } from "@nestjs@repositories/user";
import { TokenService } from "@nestjs@services/token";
import {
	PASSWORD_SERVICE_INTERFACE,
	TOKEN_SERVICE_INTERFACE,
	USER_REPOSITORY_INTERFACE,
} from "@application/ports/symbols";

/**
 * Map permettant de lier les interfaces des services et des repositories avec leurs réelles implémentations.
 */
export const interfaceInjectionMap = [
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
	providers: [...interfaceInjectionMap],
	exports: [...interfaceInjectionMap],
})
export class InterfaceInjectionModule {
}
