import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateMaintenanceIntervalCommand } from "../definitions/update-maintenance-interval-command";
import { Motorcycle } from "@domain/models/Motorcycle";
import { MotorcycleNotFound } from "@domain/errors/MotorcycleNotFound";
import { MotorcycleRepository } from "src/application/ports/repositories/MotorcycleRepository";

@CommandHandler(UpdateMaintenanceIntervalCommand)
export class UpdateMaintenanceIntervalCommandHandler implements ICommandHandler<UpdateMaintenanceIntervalCommand> {
	public constructor(private readonly motorcycleRepository: MotorcycleRepository) {}

	public async execute(command: UpdateMaintenanceIntervalCommand): Promise<Motorcycle | MotorcycleNotFound> {
		const motorcycle = await this.motorcycleRepository.findById(command.motorcycleId);

		if (!motorcycle) {
			return new MotorcycleNotFound("Motorcycle not found");
		}

		motorcycle.maintenanceInterval = command.maintenanceInterval;

		await this.motorcycleRepository.save(motorcycle);

		return motorcycle;
	}
}
