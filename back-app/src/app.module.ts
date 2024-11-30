import { HelloWorldModule } from "@exposition/http/modules/hello-world.module";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
	imports: [
		CqrsModule,
		HelloWorldModule
	]
})
export class AppModule {}
