import { Module } from "@nestjs/common";

import { UserRepository } from "@nestjs@repositories/user.repository-impl";
import { CreateAdminAccount } from "@nestjs@services/create-admin-account-impl";
import { ProviderInjectionModule } from "./common/provider-injection.module";
import { AppInitializer } from "@nestjs@services/app-initializer";
import { PasswordService } from "@nestjs@services/password.service-impl";

@Module({
	providers: [
		AppInitializer,
		CreateAdminAccount,
		UserRepository,
		PasswordService,
	],
	imports: [ProviderInjectionModule],
})
export class AppInitializerModule {}
