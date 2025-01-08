import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidGenericEntityHttpException extends HttpException {
	public constructor(message: string, entityName: string) {
		super(message, HttpStatus.BAD_REQUEST);
		this.name = entityName;
	}
}
