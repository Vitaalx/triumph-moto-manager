import { Module } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";
import { AuthModule } from "./modules/auth.module";
import { InitAppAccountModule } from "./modules/init-app-account.module";

@Module({
	providers: [
		{
			provide: APP_PIPE,
			useClass: ZodValidationPipe,
		},
	],
	imports: [AuthModule, InitAppAccountModule],
})
export class AppModule {}
