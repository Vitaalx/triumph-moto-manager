import { type Role } from "@domain/types/roles";

export interface AccessTokenContent {
	id: string;
	roles: Role[];
	iat: number;
	exp: number;
}
