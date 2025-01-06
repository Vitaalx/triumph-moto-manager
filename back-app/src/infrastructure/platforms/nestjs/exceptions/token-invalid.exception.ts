import { HttpException, HttpStatus } from "@nestjs/common";

export class TokenInvalidHttpException extends HttpException {
	public constructor() {
		super("token.invalid", HttpStatus.UNAUTHORIZED);
	}
}
