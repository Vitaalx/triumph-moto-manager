import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type IMotorcycleMaintenanceRepository } from "@application/ports/repositories/motorcycle-maintenance";
import { type ISparePartRepository } from "@application/ports/repositories/spare-part";
import { InvalidMotorcycleMaintenanceStatusError } from "@domain/errors/motorcycle-maintenance/invalid-motorcycle-maintenance-status";
import { MotorcycleMaintenanceNotFoundError } from "@domain/errors/motorcycle-maintenance/motorcycle-maintenance-not-found";
import { SparePartNotFoundError } from "@domain/errors/spare-part/spare-part-not-found";
import { InsufficientSparePartStockError } from "@domain/errors/spare-part/insufficient-spare-part-stock";
import { type MotorcycleMaintenanceUpdatedEvent } from "@domain/events/motorcycle-maintenance/motorcycle-maintenance-updated-event";
import { MaintenanceSparePart } from "@domain/types/maintenance-spare-part";
import { type IMaintenanceSparePartRepository } from "@application/ports/repositories/maintenance-spare-part";

export class UpdateMotorcycleMaintenanceUsecase {
	public constructor(
		private readonly motorcycleMaintenanceRepository: IMotorcycleMaintenanceRepository,
		private readonly maintenanceSparePartRepository: IMaintenanceSparePartRepository,
		private readonly eventStoreRepository: IEventStoreRepository,
		private readonly sparePartRepository: ISparePartRepository,
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

		try {
			await Promise.all(
				usedSpareParts.map(
					async(usedSparePart) => {
						const sparePart = await this.sparePartRepository.findById(usedSparePart.sparePartId);

						if (sparePart === null) {
							throw new SparePartNotFoundError();
						}

						if (sparePart.stock === 0 || sparePart.stock < usedSparePart.quantity) {
							throw new InsufficientSparePartStockError(sparePart.id);
						}

						//TODO a refacto
						if (motorcycleMaintenance.usedSpareParts.some(
							(sp) => sp.sparePartId === usedSparePart.sparePartId,
						)) {
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
							const maintenanceSparePart = MaintenanceSparePart.create(
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
