import { type MaintenanceSparePartEntity } from "@domain/entities/maintenance-spare-part";

export interface IMaintenanceSparePartRepository {
	findByMaintenanceId(maintenanceId: string): Promise<MaintenanceSparePartEntity | null>;
	save(maintenanceSparePart: MaintenanceSparePartEntity): Promise<void>;
	update(maintenanceSparePartId: string, maintenanceSparePart: MaintenanceSparePartEntity): Promise<void>;
}
