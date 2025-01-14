export abstract class GenericEvent <
	EventName extends string,
	EventIdentifier extends string,
	EventData extends unknown,
> {
	public constructor(
		public readonly name: EventName,
		public readonly identifier: EventIdentifier,
		public readonly data: EventData,
	) {}
}

export type Event<
	EventName extends string = string,
	EventIdentifier extends string = string,
	EventData extends unknown = unknown,
> = typeof GenericEvent<EventName, EventIdentifier, EventData>;
