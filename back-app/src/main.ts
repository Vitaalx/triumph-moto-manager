import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import "./env";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(ENV.PORT);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
