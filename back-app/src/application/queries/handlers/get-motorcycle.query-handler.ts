import { type IQueryHandler } from "@nestjs/cqrs";
import { type GetMotorcycleQuery } from "../definitions/get-motorcycle-query";
import { type MotorcycleRepository } from "src/application/ports/repositories/MotorcycleRepository";
import { type Motorcycle } from "@domain/models/Motorcycle";
import { MotorcycleNotFound } from "@domain/errors/MotorcycleNotFound";

export class GetMotorcycleQueryHandler implements IQueryHandler<GetMotorcycleQuery> {
	public constructor(private readonly motorcycleRepository: MotorcycleRepository) {}

	public async execute(query: GetMotorcycleQuery): Promise<Motorcycle | MotorcycleNotFound> {
		const motorcycle = await this.motorcycleRepository.findById(query.motorcycleId);
		if (!motorcycle) {
			return new MotorcycleNotFound("Motorcycle not found");
		}
		return motorcycle;
	}
}
