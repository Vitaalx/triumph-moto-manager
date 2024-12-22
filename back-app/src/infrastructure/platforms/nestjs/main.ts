import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import "@config/env";

void NestFactory.create(AppModule)
	.then((app) => {
		void app.listen(ENV.PORT);
		process.stdout.write(
			`====================================\n\n` +
			`Server has started correctly on:\n\n` +
			 `- Port: ${ENV.PORT}\n` +
			 `- Host: ${ENV.HOST}\n` +
			 `- Environment: ${ENV.ENVIRONMENT}\n` +
			 `- Origin: ${ENV.ORIGIN}\n\n` +
			`====================================\n`,
		);
	});
