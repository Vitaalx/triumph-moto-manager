import { IncidentType } from "@domain/types/incident-type";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";
import { randomUUID } from "crypto";

export class MotorcycleIncidentEntity {
	public constructor(
		public id: string,
		public type: IncidentType,
		public description: string,
		public motorcycleId: MotorcycleLicensePlate,
		public driverId: string,
		public incidentDate: Date,
		public incidentTime: string,
		public location: string,
	) {
	}

	public static from(
		type: string,
		description: string,
		motorcycleId: string,
		driverId: string,
		incidentDate: Date,
		incidentTime: string,
		location: string,
	) {
		const incidentType = IncidentType.from(type);

		if (incidentType instanceof Error) {
			return incidentType;
		}

		const motorcycleLicensePlate = MotorcycleLicensePlate.from(motorcycleId);

		if (motorcycleLicensePlate instanceof Error) {
			return motorcycleLicensePlate;
		}

		return new MotorcycleIncidentEntity(
			randomUUID(),
			incidentType,
			description,
			motorcycleLicensePlate,
			driverId,
			incidentDate,
			incidentTime,
			location,
		);
	}
}
