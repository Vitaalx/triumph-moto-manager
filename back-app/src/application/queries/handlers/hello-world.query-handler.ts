import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { HelloWorldQuery } from "../definitions/hello-world-query";
import { HelloWorld } from "@domain/models/hello-world.entity";

@QueryHandler(HelloWorldQuery)
export class HelloWorldQueryHandler implements IQueryHandler<HelloWorldQuery> {
	async execute(): Promise<HelloWorld> {
		return new HelloWorld("Hello World!");
	}
}
