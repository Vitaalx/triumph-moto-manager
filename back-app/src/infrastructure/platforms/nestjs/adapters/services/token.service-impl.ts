import { type TokenPayload } from "@domain/models/token-payload";
import { type TokenService } from "@application/ports/services/token-service";
import { type JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenServiceImpl implements TokenService {
	public constructor(private readonly jwtService: JwtService) {}

	public generate(tokenPayload: TokenPayload): string {
		return this.jwtService.sign(
			tokenPayload,
			{
				secret: ENV.JWT_KEY,
				expiresIn: ENV.JWT_TIME,
			},
		);
	}

	public verify(token: string): string | null {
		try {
			const decoded = this.jwtService.verify(token, {
				secret: ENV.JWT_KEY,
			});
			return decoded;
		} catch {
			return null;
		}
	}
}
