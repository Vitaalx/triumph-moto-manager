import { HttpException, HttpStatus } from "@nestjs/common";

export class MotorcycleAlreadyExistsHttpException extends HttpException {
	public constructor(public readonly message: string) {
		super(message, HttpStatus.CONFLICT);
	}
}
