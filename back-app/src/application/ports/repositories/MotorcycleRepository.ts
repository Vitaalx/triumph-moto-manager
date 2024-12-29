import { type Motorcycle } from "@domain/models/Motorcycle";

export interface MotorcycleRepository {
	findById(id: string): Promise<Motorcycle | null>;
	save(motorcycle: Motorcycle): Promise<void>;
	getMotorcycles(): Promise<Motorcycle[]>;
}
