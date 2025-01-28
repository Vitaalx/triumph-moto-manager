import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema({
	identifier: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	data: {
		type: JSON,
		required: true,
	},
	version: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
export const EVENTS_NAME = "Events";

export const Events = mongoose.model(EVENTS_NAME, eventsSchema);
