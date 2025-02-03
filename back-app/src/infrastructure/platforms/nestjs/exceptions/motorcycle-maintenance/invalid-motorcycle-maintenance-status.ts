import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidMotorcycleMaintenanceStatusHttpException extends HttpException {
	public constructor(public readonly message: string) {
		super(message, HttpStatus.BAD_REQUEST);
	}
}
