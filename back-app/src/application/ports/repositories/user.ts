import { type UserEntity } from "@domain/entities/user";

export interface IUserRepository {
	findByEmail(email: string): Promise<UserEntity | null>;
	findById(id: string): Promise<UserEntity | null>;
	createAdminAccount(email: string, password: string): Promise<void>;
}
