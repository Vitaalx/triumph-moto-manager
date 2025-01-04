import { UserRepositoryImpl } from "@nestjs@repositories/user.repository-impl";
import { CreateAdminAccountImpl } from "@nestjs@services/create-admin-account-impl";
import { USER_REPOSITORY_INTERFACE } from "@application/ports/repositories/user-repository";
import { Module } from "@nestjs/common";
import { ProviderInjectionModule } from "./provider-injection.module";
import { AppInitializer } from "@nestjs@services/app-initializer";

const initAppAccountProviders = [
	{
		provide: CreateAdminAccountImpl,
		useFactory: (userRepository: UserRepositoryImpl) => new CreateAdminAccountImpl(userRepository),
		inject: [USER_REPOSITORY_INTERFACE],
	},
];

@Module({
	providers: [
		AppInitializer,
		CreateAdminAccountImpl,
		UserRepositoryImpl,
		...initAppAccountProviders,
	],
	imports: [ProviderInjectionModule],
})
export class InitAppAccountModule {}
