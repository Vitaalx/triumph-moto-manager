import { Catch, HttpException, Logger, type ArgumentsHost, type ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { ZodError } from "zod";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(HttpExceptionFilter.name);

	public catch(exception: HttpException, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();
		const status = exception.getStatus();
		const exceptionMessage = exception.message;

		if (exception.cause instanceof Error) {
			this.handleInternalErrors(response, exception, status);
			return;
		}

		if (exception.name.startsWith("Zod")) {
			this.handlerZodErrors(response, exception, status);
			return;
		}

		response
			.status(status)
			.json(
				{
					statusCode: status,
					info: exceptionMessage,
				},
			);
	}

	private handleInternalErrors(response: Response, exception: HttpException, status: number): void {
		this.logger.error(
			`Exception: ${exception.message}, stack: ${exception.stack}`,
		);
		response
			.status(status)
			.json(
				{
					statusCode: status,
					info: "Internal server error.",
				},
			);
	}

	private handlerZodErrors(response: Response, exception: HttpException, status: number): void {
		const zodResponse = exception.getResponse() as ZodError;
		response
			.status(status)
			.json(
				{
					...zodResponse.errors,
					statusCode: status,
					info: "zod.error",
				},
			);
	}
}
