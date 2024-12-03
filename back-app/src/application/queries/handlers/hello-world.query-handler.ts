import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { HelloWorldQuery } from "../definitions/hello-world-query";
import { HelloWorld } from "@domain/models/hello-world.entity";
@QueryHandler(HelloWorldQuery)
export class HelloWorldQueryHandler implements IQueryHandler<HelloWorldQuery> {
	public async execute(): Promise<HelloWorld> {
		return Promise.resolve(new HelloWorld("Hello World! Liam here!"));
	}
}
