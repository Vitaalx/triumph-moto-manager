import { type TokenPayload } from "@domain/models/token-payload";

export interface TokenService {
	generate(tokenPayload: TokenPayload): string;
	verify(token: string): string | null;
}

export const TOKEN_SERVICE_INTERFACE = Symbol("TokenService");
