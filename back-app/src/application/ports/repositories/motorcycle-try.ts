import { type MotorcycleTryEntity } from "@domain/entities/motorcycle-try";
import { type MotorcycleLicensePlate } from "@domain/types/license-plate";

export interface IMotorcycleTryRepository {
	save(motorcycleTry: MotorcycleTryEntity): Promise<void>;
	findById(id: string): Promise<MotorcycleTryEntity | null>;
	getMotorcyclesInTrial(): Promise<MotorcycleTryEntity[]>;
	getMotorcyclesTrialPassed(): Promise<MotorcycleTryEntity[]>;
	getMotorcyclesTrialComming(): Promise<MotorcycleTryEntity[]>;
	getMotorcycleTryByDriverIdAndMotorcycleId(
		driverId: string,
		motorcycleId: MotorcycleLicensePlate,
		startDate: Date,
		endDate: Date,
	): Promise<MotorcycleTryEntity | null>;
	delete(motorcycleTry: MotorcycleTryEntity): Promise<void>;
}
