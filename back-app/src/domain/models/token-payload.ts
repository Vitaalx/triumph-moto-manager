import { type User } from "./user";

export interface TokenPayload {
	email: User["email"];
	password: User["password"];
	role: User["role"];
}
