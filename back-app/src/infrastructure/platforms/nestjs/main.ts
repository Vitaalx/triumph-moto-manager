import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import "@config/env";
import "@providers/prisma";

void NestFactory.create(AppModule)
	.then((app) => {
		void app.listen(ENV.PORT);
		app.use(cookieParser());
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
