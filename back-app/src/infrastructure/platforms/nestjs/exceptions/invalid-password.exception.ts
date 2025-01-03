import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidPasswordHttpException extends HttpException {
	public constructor() {
		super("password.invalid", HttpStatus.UNAUTHORIZED);
	}
}
