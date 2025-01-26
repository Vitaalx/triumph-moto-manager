import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type IMotorcycleTryRepository } from "@application/ports/repositories/motorcycle-try";
import { MotorcycleTryNotFoundError } from "@domain/errors/motorcycle-try/motorcycle-try-not-found";
import { type MotorcycleTryDeletedEvent } from "@domain/events/motorcycle-try/motorcycle-try-deleted-event";

export class DeleteMotorcycleTryUsecase {
	public constructor(
		private readonly motorcycleTryRepository: IMotorcycleTryRepository,
		private readonly eventStore: IEventStoreRepository,
	) {}

	public async execute(motorcycleTryId: string) {
		const motorcycleTry = await this.motorcycleTryRepository.findById(motorcycleTryId);

		if (motorcycleTry === null) {
			return new MotorcycleTryNotFoundError();
		}

		const event: MotorcycleTryDeletedEvent = {
			date: new Date(),
			identifier: motorcycleTry.id,
			type: "MOTORCYCLE-TRY_DELETED",
			version: 1,
			data: {
				driverId: motorcycleTry.driverId,
				motorcycleId: motorcycleTry.motorcycleId,
				startDate: motorcycleTry.startDate,
				endDate: motorcycleTry.endDate,
			},
		};

		await this.eventStore.publish(event);

		return this.motorcycleTryRepository.delete(motorcycleTry);
	}
}
