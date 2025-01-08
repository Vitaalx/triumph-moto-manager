import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";

import { type TokenPayload } from "@domain/entities/token-payload";
import { AccessTokenContent } from "@domain/entities/access-token-content";

@Injectable()
export class TokenService {
	public constructor(private readonly jwtService: JwtService) {}

	public generate(tokenPayload: TokenPayload) {
		return this.jwtService.sign(
			tokenPayload,
			{
				secret: ENV.JWT_KEY,
				expiresIn: ENV.JWT_TIME,
			},
		);
	}

	public verify(token: string): AccessTokenContent | null {
		try {
			const decoded = this.jwtService.verify(token, {
				secret: ENV.JWT_KEY,
			});
			return decoded as AccessTokenContent;
		} catch {
			return null;
		}
	}
}
