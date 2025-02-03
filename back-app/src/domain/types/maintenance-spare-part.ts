import { randomUUID } from "crypto";

export class MaintenanceSparePart {
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
		return new MaintenanceSparePart(
			randomUUID(),
			sparePartId,
			maintenanceId,
			quantity,
		);
	}
}
