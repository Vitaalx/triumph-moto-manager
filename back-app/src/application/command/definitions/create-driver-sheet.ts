import { type CreateDriverUsecase } from "@application/usecases/driver/create-driver-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class CreateDriverSheetCommand extends Command<ReturnType<CreateDriverUsecase["execute"]>> {
	public constructor(
		public readonly name: string,
		public readonly firstname: string,
		public readonly age: number,
		public readonly email: string,
		public readonly motorcycleLicenseType: string,
		public readonly drivingExperience: string,
	) {
		super();
	}
}
