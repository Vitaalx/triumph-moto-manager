import { type MotorcycleTryEntity } from "@domain/entities/motorcycle-try";

export interface IMotorcycleTryRepository {
	save(motorcycleTry: MotorcycleTryEntity): Promise<void>;
	findById(id: string): Promise<MotorcycleTryEntity | null>;
	findByDriverId(driverId: string): Promise<MotorcycleTryEntity[]>;
}
