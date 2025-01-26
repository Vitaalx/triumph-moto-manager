import { HttpException, HttpStatus } from "@nestjs/common";

export class MotorcycleTryNotFoundHttpException extends HttpException {
	public constructor(public readonly message: string) {
		super(message, HttpStatus.NOT_FOUND);
	}
}
