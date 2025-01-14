import { type GenericEvent } from "@domain/events/event-generic";

export interface IEventStoreRepository {
	publish<
		EventName extends string, EventIdentifier extends string, EventData extends unknown,
	>
	(event: GenericEvent<EventName, EventIdentifier, EventData>): Promise<void>;
	getAllEventsByEntityName(entityName: string): Promise<GenericEvent<string, string, unknown>[]>;
}
