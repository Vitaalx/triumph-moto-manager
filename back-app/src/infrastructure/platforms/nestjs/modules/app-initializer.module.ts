import { Module } from "@nestjs/common";

import { UserRepository } from "@nestjs@repositories/user";
import { CreateAdminAccount } from "@nestjs@services/create-admin-account";
import { InterfaceInjectionModule } from "./common/interface-injection.module";
import { AppInitializer } from "@nestjs@services/app-initializer";
import { BcryptPasswordService } from "../adapters/services/bcrypt-password";

@Module({
	providers: [
		AppInitializer,
		CreateAdminAccount,
		UserRepository,
		BcryptPasswordService,
	],
	imports: [InterfaceInjectionModule],
})
export class AppInitializerModule {}
