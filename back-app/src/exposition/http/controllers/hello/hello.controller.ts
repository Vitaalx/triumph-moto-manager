import { HelloWorldQuery } from "@application/queries/definitions/hello-world-query";
import { Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";

@Controller("hello-world")
export class HelloWorldController {
	constructor(private readonly queryBus: QueryBus) {}

  @Get()
	async getHello(): Promise<string> {
		return this.queryBus.execute(new HelloWorldQuery());
	}
}
