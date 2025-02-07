import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type IMotorcycleMaintenanceRepository } from "@application/ports/repositories/motorcycle-maintenance";
import { InvalidMotorcycleMaintenanceStatusError } from "@domain/errors/motorcycle-maintenance/invalid-motorcycle-maintenance-status";
import { MotorcycleMaintenanceNotFoundError } from "@domain/errors/motorcycle-maintenance/motorcycle-maintenance-not-found";
import { type SparePartNotFoundError } from "@domain/errors/spare-part/spare-part-not-found";
import { type InsufficientSparePartStockError } from "@domain/errors/spare-part/insufficient-spare-part-stock";
import { type MotorcycleMaintenanceUpdatedEvent } from "@domain/events/motorcycle-maintenance/motorcycle-maintenance-updated-event";
import { type IMaintenanceSparePartRepository } from "@application/ports/repositories/maintenance-spare-part";
import { MaintenanceSparePartEntity } from "@domain/entities/maintenance-spare-part";
import { type SparePartService } from "@application/ports/services/spare-part-service";

export class UpdateMotorcycleMaintenanceUsecase {
	public constructor(
		private readonly motorcycleMaintenanceRepository: IMotorcycleMaintenanceRepository,
		private readonly maintenanceSparePartRepository: IMaintenanceSparePartRepository,
		private readonly eventStoreRepository: IEventStoreRepository,
		private readonly sparePartService: SparePartService,
	) {}

	public async execute(
		maintenanceId: string,
		technicalRecommendations: string,
		usedSpareParts: {
			sparePartId: string;
			quantity: number;
		}[],
		laborPrice: number,
	) {
		const motorcycleMaintenance = await this.motorcycleMaintenanceRepository.findById(maintenanceId);

		if (motorcycleMaintenance === null) {
			return new MotorcycleMaintenanceNotFoundError();
		}

		if (motorcycleMaintenance.status !== "IN_PROGRESS") {
			return new InvalidMotorcycleMaintenanceStatusError();
		}

		const maintenanceSparePartIds = motorcycleMaintenance.usedSpareParts.map((sparePart) => sparePart.sparePartId);

		try {
			await Promise.all(
				usedSpareParts.map(
					async(usedSparePart) => {
						const { sparePartId, quantity } = usedSparePart;

						const sparePart = await this.sparePartService.checkStock(sparePartId, quantity);

						if (sparePart instanceof Error) {
							throw sparePart;
						}

						if (maintenanceSparePartIds.includes(usedSparePart.sparePartId)) {
							const sparePartIndex = motorcycleMaintenance.usedSpareParts.findIndex(
								(sp) => sp.sparePartId === usedSparePart.sparePartId,
							);

							const maintenaneSparePart = motorcycleMaintenance.usedSpareParts[sparePartIndex];
							maintenaneSparePart.quantity = usedSparePart.quantity;

							await this.maintenanceSparePartRepository.update(
								maintenaneSparePart.id,
								maintenaneSparePart,
							);
						} else {
							const maintenanceSparePart = MaintenanceSparePartEntity.create(
								usedSparePart.sparePartId,
								maintenanceId,
								usedSparePart.quantity,
							);

							await this.maintenanceSparePartRepository.save(maintenanceSparePart);
						}
					},
				),
			);
		} catch (error) {
			return error as SparePartNotFoundError | InsufficientSparePartStockError;
		}

		motorcycleMaintenance.technicalRecommendations = technicalRecommendations;
		motorcycleMaintenance.laborPrice = laborPrice;

		const event: MotorcycleMaintenanceUpdatedEvent = {
			date: new Date(),
			identifier: maintenanceId,
			type: "MOTORCYCLE-MAINTENANCE_UPDATED",
			version: 1,
			data: {
				technicalRecommendations,
				usedSpareParts: motorcycleMaintenance.usedSpareParts,
				laborPrice,
			},
		};

		await this.eventStoreRepository.publish(event);

		return this.motorcycleMaintenanceRepository.update(motorcycleMaintenance.id, motorcycleMaintenance);
	}
}
