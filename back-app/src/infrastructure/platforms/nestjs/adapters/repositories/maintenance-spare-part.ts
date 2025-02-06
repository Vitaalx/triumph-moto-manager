import { type IMaintenanceSparePartRepository } from "@application/ports/repositories/maintenance-spare-part";
import { MaintenanceSparePartEntity } from "@domain/entities/maintenance-spare-part";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MaintenanceSparePartRepository implements IMaintenanceSparePartRepository {
	public async findByMaintenanceId(maintenanceId: string): Promise<MaintenanceSparePartEntity | null> {
		const maintenanceSparePart = await prisma.maintenanceSparePart.findFirst({
			where: {
				maintenanceId,
			},
		});
		return maintenanceSparePart;
	}

	public async save(maintenanceSparePart: MaintenanceSparePartEntity): Promise<void> {
		await prisma.maintenanceSparePart.create({
			data: {
				id: maintenanceSparePart.id,
				maintenanceId: maintenanceSparePart.maintenanceId,
				sparePartId: maintenanceSparePart.sparePartId,
				quantity: maintenanceSparePart.quantity,
			},
		});
	}

	public async update(
		maintenanceSparePartId: string,
		maintenanceSparePart: MaintenanceSparePartEntity,
	): Promise<void> {
		await prisma.maintenanceSparePart.update({
			where: {
				id: maintenanceSparePartId,
			},
			data: {
				quantity: maintenanceSparePart.quantity,
			},
		});
	}
}
