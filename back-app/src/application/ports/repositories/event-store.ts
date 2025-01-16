import { type Event } from "@domain/events/event-generic";

export interface IEventStoreRepository {
	publish
	(event: Event): Promise<void>;
	getAllEventsByEntityName(entityName: string): Promise<Event>[];
}
