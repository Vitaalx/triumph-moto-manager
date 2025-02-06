import { type MotorcycleIncidentEntity } from "@domain/entities/motorcycle-incident";
import { type MotorcycleLicensePlate } from "@domain/types/license-plate";

export interface IMotorcycleIncidentRepository {
	save(incident: MotorcycleIncidentEntity): Promise<void>;
	findByLicensePlate(licensePlate: MotorcycleLicensePlate): Promise<MotorcycleIncidentEntity | null>;
	findById(id: string): Promise<MotorcycleIncidentEntity | null>;
	getMotorcycleIncidents(): Promise<MotorcycleIncidentEntity[]>;
	update(id: string, motorcycleIncident: MotorcycleIncidentEntity): Promise<void>;
}
