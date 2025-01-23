import { type DriverSheetEntity } from "@domain/entities/driver-sheet";
import { type Email } from "@domain/types/email";

export interface IDriverRepository {
	save(driver: DriverSheetEntity): Promise<void>;
	findById(id: string): Promise<DriverSheetEntity | null>;
	findByEmail(email: Email): Promise<DriverSheetEntity | null>;
	getDrivers(): Promise<DriverSheetEntity[]>;
	delete(driver: DriverSheetEntity): Promise<void>;
	updateById(id: string, driver: DriverSheetEntity): Promise<void>;
}
