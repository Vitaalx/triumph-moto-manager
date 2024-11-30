import { Module } from "@nestjs/common";
import { HelloWorldQueryHandler } from "@application/queries/handlers/hello-world.query-handler";
import { HelloWorldController } from "../controllers/hello/hello.controller";

@Module({
	controllers: [HelloWorldController],
	providers: [HelloWorldQueryHandler]
})
export class HelloWorldModule {}
