import { Module } from "@nestjs/common";

import { UserRepository } from "@nestjs@repositories/user";
import { CreateAdminAccount } from "@nestjs@services/create-admin-account";
import { InterfaceInjectionModule } from "./common/interface-injection.module";
import { AppInitializer } from "@nestjs@services/app-initializer";
import { PasswordService } from "@nestjs@services/password";

@Module({
	providers: [
		AppInitializer,
		CreateAdminAccount,
		UserRepository,
		PasswordService,
	],
	imports: [InterfaceInjectionModule],
})
export class AppInitializerModule {}
