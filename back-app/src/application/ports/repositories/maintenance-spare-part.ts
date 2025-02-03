import { type MaintenanceSparePart } from "@domain/types/maintenance-spare-part";

export interface IMaintenanceSparePartRepository {
	findByMaintenanceId(maintenanceId: string): Promise<MaintenanceSparePart | null>;
	save(maintenanceSparePart: MaintenanceSparePart): Promise<void>;
	update(maintenanceSparePartId: string, maintenanceSparePart: MaintenanceSparePart): Promise<void>;
}
