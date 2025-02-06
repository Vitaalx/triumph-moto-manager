import { type IEventStoreRepository } from "@application/ports/repositories/event-store";
import { type IMotorcycleRepository } from "@application/ports/repositories/motorcycle";
import { type IMotorcycleMaintenanceRepository } from "@application/ports/repositories/motorcycle-maintenance";
import { type ISparePartRepository } from "@application/ports/repositories/spare-part";
import { InvalidMotorcycleMaintenanceStatusError } from "@domain/errors/motorcycle-maintenance/invalid-motorcycle-maintenance-status";
import { MissingLaborPriceError } from "@domain/errors/motorcycle-maintenance/missing-labor-price";
import { MotorcycleMaintenanceNotFoundError } from "@domain/errors/motorcycle-maintenance/motorcycle-maintenance-not-found";
import { MotorcycleNotFoundError } from "@domain/errors/motorcycle/motorcycle-not-found";
import { InsufficientSparePartStockError } from "@domain/errors/spare-part/insufficient-spare-part-stock";
import { SparePartNotFoundError } from "@domain/errors/spare-part/spare-part-not-found";
import { type MotorcycleMaintenanceClosingEvent } from "@domain/events/motorcycle-maintenance/motorcycle-maintenance-closing-event";

export class CloseMotorcycleMaintenanceUsecase {
	public constructor(
		private readonly motorcycleMaintenance: IMotorcycleMaintenanceRepository,
		private readonly motorcycleRepository: IMotorcycleRepository,
		private readonly sparePartRepository: ISparePartRepository,
		private readonly eventStoreRepository: IEventStoreRepository,
	) {}

	public async execute(maintenanceId: string) {
		const motorcycleMaintenance = await this.motorcycleMaintenance.findById(maintenanceId);

		if (motorcycleMaintenance === null) {
			return new MotorcycleMaintenanceNotFoundError();
		}

		if (motorcycleMaintenance.status !== "IN_PROGRESS") {
			return new InvalidMotorcycleMaintenanceStatusError();
		}

		if (motorcycleMaintenance.laborPrice === 0) {
			return new MissingLaborPriceError();
		}

		const sparePartPromises: Promise<void>[] = [];
		let calculatedTotalSparePartsPrice = 0;

		const motorcycle = await this.motorcycleRepository.findByLicensePlate(motorcycleMaintenance.motorcycleId);

		if (motorcycle === null) {
			return new MotorcycleNotFoundError();
		}

		try {
			const promises = motorcycleMaintenance.usedSpareParts.map(
				async(maintenanceSparePart) => {
					const sparePartEntity = await this.sparePartRepository.findById(
						maintenanceSparePart.sparePartId,
					);

					if (sparePartEntity === null) {
						throw new SparePartNotFoundError();
					}

					if (sparePartEntity.stock === 0 || sparePartEntity.stock < maintenanceSparePart.quantity) {
						throw new InsufficientSparePartStockError(sparePartEntity.id);
					}

					sparePartEntity.stock -= maintenanceSparePart.quantity;
					calculatedTotalSparePartsPrice += sparePartEntity.price.value * maintenanceSparePart.quantity;

					await this.sparePartRepository.update(maintenanceSparePart.sparePartId, sparePartEntity);
				},
			);

			sparePartPromises.push(...promises);
		} catch (error) {
			return error as SparePartNotFoundError | InsufficientSparePartStockError;
		}

		await Promise.all(sparePartPromises);

		motorcycleMaintenance.totalSparePartsPrice = calculatedTotalSparePartsPrice;

		if (motorcycle.isValidWarrantyEndDate()) {
			motorcycleMaintenance.totalMaintenancePrice = 0;
		} else {
			motorcycleMaintenance.totalMaintenancePrice
				= calculatedTotalSparePartsPrice + motorcycleMaintenance.laborPrice;
		}

		motorcycleMaintenance.status = "CLOSED";

		const event: MotorcycleMaintenanceClosingEvent = {
			date: new Date(),
			identifier: motorcycleMaintenance.id,
			type: "MOTORCYCLE-MAINTENANCE_CLOSING",
			version: 1,
			data: {
				totalSparePartsPrice: motorcycleMaintenance.totalSparePartsPrice,
				totalMaintenancePrice: motorcycleMaintenance.totalMaintenancePrice,
				status: motorcycleMaintenance.status,
			},
		};

		await this.eventStoreRepository.publish(event);

		return this.motorcycleMaintenance.update(motorcycleMaintenance.id, motorcycleMaintenance);
	}
}
