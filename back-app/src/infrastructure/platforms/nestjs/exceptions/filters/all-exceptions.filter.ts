import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	private readonly logger = new Logger(AllExceptionsFilter.name);

	public constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

	public catch(exception: Error, host: ArgumentsHost) {
		const { httpAdapter } = this.httpAdapterHost;
		const ctx = host.switchToHttp();

		const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		this.logger.error(
			`Exception: ${exception.message}, stack: ${exception.stack}`,
		);

		const responseBody = {
			status: httpStatus,
			message: "Internal Server error 😒",
		};

		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
	}
}
