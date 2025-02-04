import { Module } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";

import { AuthModule } from "./modules/auth.module";
import { AppInitializerModule } from "./modules/app-initializer.module";
import { MotorcycleModule } from "./modules/motorcycle.module";
import { DriverModule } from "./modules/driver.module";
import { MotorcycleTryModule } from "./modules/motorcycle-try.module";
import { MotorcycleIncidentModule } from "./modules/motorcycle-incident.module";
import { MotorcycleMaintenanceModule } from "./modules/motorcycle-maintenance.module";
import { SparePartModule } from "./modules/spare-part.module";

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
		DriverModule,
		MotorcycleTryModule,
		MotorcycleIncidentModule,
		AppInitializerModule,
		MotorcycleMaintenanceModule,
		SparePartModule,
	],
})
export class AppModule {}

