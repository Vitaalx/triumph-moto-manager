import { Injectable, Logger } from "@nestjs/common";

import { type ICreateAdminAccount } from "@application/ports/services/create-admin-account";
import { BcryptPasswordService } from "@infrastructure/platforms/nestjs/adapters/services/bcrypt-password";
import { UserRepository } from "@nestjs@repositories/user";

@Injectable()
export class CreateAdminAccount implements ICreateAdminAccount {
	public constructor(
		private readonly userRepository: UserRepository,
		private readonly passwordService: BcryptPasswordService,
	) {}

	private readonly logger = new Logger(CreateAdminAccount.name);

	public async createAdminAccount(email: string, password: string): Promise<void> {
		this.logger.log("Creating admin account...");

		const hashedPassword = await this.passwordService.hash(password);

		try {
			await this.userRepository.createAdminAccount(email, hashedPassword);
		} catch (error) {
			this.logger.error("Check if database is created.");
			throw error;
		}

		this.logger.log(`Admin account with email ${email} created!`);
	}
}
