import { type User } from "@domain/models/user";

export interface IUserRepository {
	findByEmail(email: string): Promise<User | null>;
	findById(id: string): Promise<User | null>;
	createAdminAccount(email: string, password: string): Promise<void>;
}
