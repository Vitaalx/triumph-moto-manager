import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundHttpException extends HttpException {
	public constructor() {
		super("user.notfound", HttpStatus.NOT_FOUND);
	}
}
