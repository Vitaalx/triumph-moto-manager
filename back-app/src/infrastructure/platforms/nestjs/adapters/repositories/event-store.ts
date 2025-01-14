import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type GenericEvent } from "@domain/events/event-generic";

export class EventStoreRepository implements IEventStoreRepository {
	public async publish
	<
		EventName extends string,
		EventIdentifier extends string,
		EventData extends unknown,
	>(event: GenericEvent<EventName, EventIdentifier, EventData>): Promise<void> {
		await prisma.events.create({
			data: {
				eventName: event.name,
				identifier: event.identifier,
				data: JSON.stringify(event.data),
			},
		});
	}

	public getAllEventsByEntityName(entityName: string): Promise<GenericEvent<string, string, unknown>[]> {
		throw new Error("Method not implemented.");
	}
}
