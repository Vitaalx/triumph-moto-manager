import { HttpException, HttpStatus } from "@nestjs/common";

export class UserUnauthorizedHttpException extends HttpException {
	public constructor() {
		super("user.unauthorized", HttpStatus.UNAUTHORIZED);
	}
}
