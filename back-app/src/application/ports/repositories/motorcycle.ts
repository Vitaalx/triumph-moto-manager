import { type MotorcycleEntity } from "@domain/entities/motorcycle";
import { type MotorcycleLicensePlate } from "@domain/types/license-plate";

export interface IMotorcycleRepository {
	save(motorcycle: MotorcycleEntity): Promise<void>;
	getMotorcycles(): Promise<MotorcycleEntity[]>;
	findByLicensePlate(licensePlate: MotorcycleLicensePlate): Promise<MotorcycleEntity | null>;
	updateByLicensePlate(licensePlate: MotorcycleLicensePlate, motorcycle: MotorcycleEntity): Promise<void>;
	delete(licensePlate: MotorcycleLicensePlate): Promise<void>;
}
