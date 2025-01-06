import { Injectable, Logger } from "@nestjs/common";

import { type ICreateAdminAccount } from "@application/ports/services/create-admin-account";
import { PasswordService } from "@nestjs@services/password";
import { UserRepository } from "@nestjs@repositories/user";

@Injectable()
export class CreateAdminAccount implements ICreateAdminAccount {
	public constructor(
		private readonly userRepository: UserRepository,
		private readonly passwordService: PasswordService,
	) {}

	private readonly logger = new Logger(CreateAdminAccount.name);

	public async createAdminAccount(email: string, password: string): Promise<void> {
		this.logger.log("Creating admin account...");

		const hashedPassword = await this.passwordService.hash(password);

		await this.userRepository.createAdminAccount(email, hashedPassword);

		this.logger.log(`Admin account with email ${email} created!`);
	}
}
