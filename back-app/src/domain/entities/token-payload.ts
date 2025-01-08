import { type UserEntity } from "./user";

export interface TokenPayload {
	userId: UserEntity["id"];
}
