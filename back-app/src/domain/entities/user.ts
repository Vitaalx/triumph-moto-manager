import { type Role } from "@domain/types/roles";

export interface UserEntity {
	id: string;
	email: string;
	password: string;
	roles: Role[];
}

