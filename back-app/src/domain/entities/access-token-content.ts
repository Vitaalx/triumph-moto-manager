import { type UserEntity } from "./user";

export interface AccessTokenContent {
	userId: UserEntity["id"];
}
