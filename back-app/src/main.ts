import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import "./env";

void NestFactory.create(AppModule)
	.then((app) => {
		void app.listen(ENV.PORT);
	});
