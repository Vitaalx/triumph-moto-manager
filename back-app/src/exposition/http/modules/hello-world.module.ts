import { Module } from "@nestjs/common";
import { HelloWorldController } from "../controllers/hello/hello.controller";
import { HelloWorldQueryHandler } from "@application/queries/handlers/hello-world.query-handler";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
	imports: [CqrsModule],
	controllers: [HelloWorldController],
	providers: [HelloWorldQueryHandler],
})
export class HelloWorldModule {
}
