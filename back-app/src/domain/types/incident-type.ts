import { InvalidIncidentTypeError } from "@domain/errors/motorcycle-incident/invalid-incident-type";

export class IncidentType {
	public constructor(public readonly value: string) {}

	public static from(type: string) {
		if (!["ACCIDENT", "INFRACTION"].includes(type.toUpperCase())) {
			return new InvalidIncidentTypeError();
		}
		return new IncidentType(type);
	}
}
