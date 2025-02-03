import { HttpException, HttpStatus } from "@nestjs/common";

export class InsufficientSparePartStockHttpException extends HttpException {
	public constructor(public readonly message: string) {
		super(message, HttpStatus.UNAUTHORIZED);
	}
}
