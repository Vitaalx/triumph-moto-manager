import { HelloWorldQueryHandler } from "@application/queries/handlers/hello-world.query-handler";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { HelloWorldController } from "../controllers/hello-world.controller";

@Module({
	imports: [CqrsModule],
	controllers: [HelloWorldController],
	providers: [HelloWorldQueryHandler],
})
export class HelloWorldModule {}