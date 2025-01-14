import { HttpException, HttpStatus } from "@nestjs/common";

export class PasswordInvalidHttpException extends HttpException {
	public constructor() {
		super("password.invalid", HttpStatus.UNAUTHORIZED);
	}
}
