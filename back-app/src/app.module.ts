import { HelloWorldModule } from "@exposition/http/modules/hello-world.module";
import { Module } from "@nestjs/common";

@Module({
	imports: [HelloWorldModule],
})
export class AppModule {}
