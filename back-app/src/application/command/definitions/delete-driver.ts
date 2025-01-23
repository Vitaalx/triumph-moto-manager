import { type DeleteDriverUsecase } from "@application/usecases/driver/delete-driver-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class DeleteDriverCommand extends Command<ReturnType<DeleteDriverUsecase["execute"]>> {
	public constructor(public readonly driverId: string) {
		super();
	}
}
