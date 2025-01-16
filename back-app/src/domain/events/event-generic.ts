import { type MotorcycleEvent } from "./motorcycle/motorcycle-event";

export interface EventGeneric<Type, Version, Data> {
	readonly identifier: string;
	readonly type: Type;
	readonly date: Date;
	readonly version: Version;
	readonly data: Data;
}

export type Event = MotorcycleEvent;
