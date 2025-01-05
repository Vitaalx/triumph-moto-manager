import { Injectable, type OnApplicationBootstrap } from "@nestjs/common";

import { CreateAdminAccount } from "./create-admin-account-impl";

/**
 * Service permettant d'initialiser l'application avec un compte admin.
 */
@Injectable()
export class AppInitializer implements OnApplicationBootstrap {
	public constructor(private readonly createAdminAccountService: CreateAdminAccount) {}

	public async onApplicationBootstrap() {
		await this.createAdminAccountService.createAdminAccount(ENV.APP_ADMIN_EMAIL, ENV.APP_ADMIN_PASSWORD);
	}
}
