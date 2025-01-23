import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidDriverAgeHttpException extends HttpException {
	public constructor(public readonly message: string) {
		super(message, HttpStatus.BAD_REQUEST);
	}
}
