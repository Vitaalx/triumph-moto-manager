import { randomUUID } from "crypto";

export class MaintenanceSparePartEntity {
	public constructor(
		public id: string,
		public sparePartId: string,
		public maintenanceId: string,
		public quantity: number,
	) {
	}

	public static create(
		sparePartId: string,
		maintenanceId: string,
		quantity: number,
	) {
		return new MaintenanceSparePartEntity(
			randomUUID(),
			sparePartId,
			maintenanceId,
			quantity,
		);
	}
}
