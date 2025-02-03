import { type MotorcycleMaintenanceEntity } from "@domain/entities/motorcycle-maintenance";
import { type MotorcycleLicensePlate } from "@domain/types/license-plate";
import { type MaintenanceStatus } from "@domain/types/maintenance-status";

export interface IMotorcycleMaintenanceRepository {
	save(motorcycleMaintenance: MotorcycleMaintenanceEntity): Promise<void>;
	findById(id: string): Promise<MotorcycleMaintenanceEntity | null>;
	update(motorcycleMaintenanceId: string, motorcycleMaintenance: MotorcycleMaintenanceEntity): Promise<void>;
	findByStatus(status: MaintenanceStatus): Promise<MotorcycleMaintenanceEntity[]>;
	findByLicensePlateAndStatus(
		licensePlate: MotorcycleLicensePlate,
		status: MaintenanceStatus
	): Promise<MotorcycleMaintenanceEntity | null>;
}
