import { MotorcycleLicensePlate } from "@domain/types/license-plate";
import { type MaintenanceStatus } from "@domain/types/maintenance-status";
import { randomUUID } from "crypto";
import { type MaintenanceSparePartEntity } from "./maintenance-spare-part";
import { type DriverSheetEntity } from "./driver-sheet";

export class MotorcycleMaintenanceEntity {
	public constructor(
		public id: string,
		public driver: DriverSheetEntity,
		public motorcycleId: MotorcycleLicensePlate,
		public technicalRecommendations: string,
		public usedSpareParts: MaintenanceSparePartEntity[],
		public totalSparePartsPrice: number,
		public totalMaintenancePrice: number,
		public laborPrice: number,
		public status: MaintenanceStatus,
		public date: Date,
	) {
	}

	public static create(
		driver: DriverSheetEntity,
		motorcycleId: string,
	) {
		const motorcycleLicensePlate = MotorcycleLicensePlate.from(motorcycleId);

		if (motorcycleLicensePlate instanceof Error) {
			return motorcycleLicensePlate;
		}

		return new MotorcycleMaintenanceEntity(
			randomUUID(),
			driver,
			motorcycleLicensePlate,
			"",
			[] as MaintenanceSparePartEntity[],
			0,
			0,
			0,
			"IN_PROGRESS",
			new Date(),
		);
	}
}
