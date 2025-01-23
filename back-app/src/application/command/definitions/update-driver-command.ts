import { type UpdateDriverUsecase } from "@application/usecases/driver/update-driver-usecase";
import { Command } from "@nestjs-architects/typed-cqrs";

export class UpdateDriverCommand extends Command<ReturnType<UpdateDriverUsecase["execute"]>> {
	public constructor(
		public readonly driverId: string,
		public readonly age: number,
		public readonly email: string,
		public readonly motorcycleLicenseType: string,
		public readonly drivingExperience: string,
	) {
		super();
	}
}
