import { HelloWorldQuery } from "@application/queries/definitions/hello-world-query";
import { HelloWorld } from "@domain/models/hello-world.entity";
import { Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";

@Controller("/hello-world")
export class HelloWorldController {
	public constructor(private readonly queryBus: QueryBus) {}

	@Get()
	public async getHello(): Promise<HelloWorld> {
		return this.queryBus.execute(new HelloWorldQuery());
	}
}
