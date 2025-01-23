import { HttpException, HttpStatus } from "@nestjs/common";

export class DriverAlreadyExistHttpException extends HttpException {
	public constructor(public readonly message: string) {
		super(message, HttpStatus.BAD_REQUEST);
	}
}
