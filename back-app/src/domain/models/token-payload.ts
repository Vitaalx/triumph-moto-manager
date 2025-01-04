import { type User } from "./user";

export interface TokenPayload {
	id: User["id"];
	role: User["role"];
}
