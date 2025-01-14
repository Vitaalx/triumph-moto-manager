import { Module } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";

import { AuthModule } from "./modules/auth.module";
import { AppInitializerModule } from "./modules/app-initializer.module";
import { MotorcycleModule } from "./modules/motorcycle.module";

@Module({
	providers: [
		{
			provide: APP_PIPE,
			useClass: ZodValidationPipe,
		},
	],
	imports: [
		AuthModule,
		MotorcycleModule,
		AppInitializerModule,
	],
})
export class AppModule {}

