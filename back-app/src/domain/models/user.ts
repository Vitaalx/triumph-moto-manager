import { type Role } from "@domain/types/roles";

export interface User {
	id: string;
	email: string;
	password: string;
	role: Role[];
}
