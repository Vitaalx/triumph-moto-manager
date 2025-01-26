import { HttpException, HttpStatus } from "@nestjs/common";

export class MotorcycleTryAlreadyExistsHttpException extends HttpException {
	public constructor(public readonly message: string) {
		super(message, HttpStatus.CONFLICT);
	}
}
