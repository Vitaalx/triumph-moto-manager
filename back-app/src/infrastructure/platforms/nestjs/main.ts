import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import "@config/env";
import "@providers/prisma";
import { HttpExceptionFilter } from "./exceptions/filters/http-exception.filter";
import { AllExceptionsFilter } from "./exceptions/filters/all-exceptions.filter";

void NestFactory.create(AppModule)
	.then((app) => {
		void app.listen(ENV.PORT);
		const httpAdapterHost = app.get(HttpAdapterHost);
		app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
		app.useGlobalFilters(new HttpExceptionFilter());
		process.stdout.write(
			"====================================\n\n"
			+ "Server has started correctly on:\n\n"
			+ `- Port: ${ENV.PORT}\n`
			+ `- Host: ${ENV.HOST}\n`
			+ `- Environment: ${ENV.ENVIRONMENT}\n`
			+ `- Origin: ${ENV.ORIGIN}\n\n`
			+ "====================================\n",
		);
	});
