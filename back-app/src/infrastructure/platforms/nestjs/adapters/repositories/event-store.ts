import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type Event } from "@domain/events/event-generic";
import { EVENTS_NAME } from "@infrastructure/database/mongoose/model";
import mongoose from "mongoose";

export class EventStoreRepository implements IEventStoreRepository {
	public async publish(event: Event): Promise<void> {
		await mongoose.model(EVENTS_NAME).create(event);
	}

	public getAllEventsByEntityName(entityName: string): Promise<Event>[] {
		throw new Error("Method not implemented.");
	}
}
