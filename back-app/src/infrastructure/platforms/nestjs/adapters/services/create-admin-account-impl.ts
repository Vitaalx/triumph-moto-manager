import { type UserRepository } from "@application/ports/repositories/user-repository";
import { type CreateAdminAccount } from "@application/ports/services/create-admin-account";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class CreateAdminAccountImpl implements CreateAdminAccount {
	public constructor(private readonly userRepository: UserRepository) {}

	private readonly logger = new Logger(CreateAdminAccountImpl.name);

	public async createAdminAccount(email: string, password: string): Promise<void> {
		this.logger.log("Creating admin account...");

		await this.userRepository.createAdminAccount(email, password);

		this.logger.log(`Admin account with email ${email} created!`);
	}
}
