import { type User } from "@domain/models/user";

export interface UserRepository {
	findByEmail(email: string): Promise<User | null>;
	createAdminAccount(email: string, password: string): Promise<void>;
}

export const USER_REPOSITORY_INTERFACE = Symbol("UserRepository");
