import { type AccessTokenContent } from "@domain/models/access-token-content";
import { type TokenPayload } from "@domain/models/token-payload";

export interface ITokenService {
	generate(tokenPayload: TokenPayload): string;
	verify(token: string): AccessTokenContent | null;
}
