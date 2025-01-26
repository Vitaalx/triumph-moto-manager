import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type Event } from "@domain/events/event-generic";

export class EventStoreRepository implements IEventStoreRepository {
	public async publish(event: Event): Promise<void> {
		//TODO save in mongodb (NoSQL) instead of prisma (postgreSQL)
		await prisma.events.create({
			data: {
				identifier: event.identifier,
				type: event.type,
				data: JSON.stringify(event.data),
				version: event.version,
			},
		});
	}

	public getAllEventsByEntityName(entityName: string): Promise<Event>[] {
		throw new Error("Method not implemented.");
	}
}
