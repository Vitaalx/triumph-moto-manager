import { HttpException, HttpStatus } from "@nestjs/common";

export class UserConflictHttpException extends HttpException {
	public constructor() {
		super("user.alreadyExist", HttpStatus.CONFLICT);
	}
}
