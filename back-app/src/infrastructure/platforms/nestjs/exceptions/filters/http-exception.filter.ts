import { Catch, HttpException, type ArgumentsHost, type ExceptionFilter } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	public catch(exception: HttpException, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();
		const status = exception.getStatus();

		response
			.status(status)
			.json(
				{
					statusCode: status,
					timestamp: new Date().toISOString(),
					info: exception.message,
				},
			);
	}
}
