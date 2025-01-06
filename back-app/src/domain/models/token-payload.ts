import { type User } from "./user";

export interface TokenPayload {
	userId: User["id"];
}
