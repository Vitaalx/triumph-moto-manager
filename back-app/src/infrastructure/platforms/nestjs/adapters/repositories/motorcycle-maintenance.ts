import { type IMotorcycleMaintenanceRepository } from "@application/ports/repositories/motorcycle-maintenance";
import { type MotorcycleMaintenanceEntity } from "@domain/entities/motorcycle-maintenance";
import { type MaintenanceStatus } from "@domain/types/maintenance-status";
import { Injectable } from "@nestjs/common";
import { MotorcycleMaintenanceMapper } from "../../mappers/motorcycle-maintenance";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";

@Injectable()
export class MotorcycleMaintenanceRepository implements IMotorcycleMaintenanceRepository {
	public constructor(private readonly mapper: MotorcycleMaintenanceMapper) {}

	public async findByLicensePlateAndStatus(
		licensePlate: MotorcycleLicensePlate,
		status: MaintenanceStatus,
	): Promise<MotorcycleMaintenanceEntity | null> {
		const motorcycleMaintenance = await prisma.motorcycleMaintenance.findFirst({
			where: {
				motorcycleId: licensePlate.value,
				status,
			},
			include: {
				usedSpareParts: true,
			},
		});

		if (motorcycleMaintenance === null) {
			return null;
		}

		return this.mapper.toDomainEntity(motorcycleMaintenance);
	}

	public async save(motorcycleMaintenance: MotorcycleMaintenanceEntity): Promise<void> {
		await prisma.motorcycleMaintenance.create({
			data: {
				id: motorcycleMaintenance.id,
				driverId: motorcycleMaintenance.driverId,
				motorcycleId: motorcycleMaintenance.motorcycleId.value,
				technicalRecommendations: motorcycleMaintenance.technicalRecommendations,
				totalSparePartsPrice: motorcycleMaintenance.totalSparePartsPrice,
				totalMaintenancePrice: motorcycleMaintenance.totalMaintenancePrice,
				laborPrice: motorcycleMaintenance.laborPrice,
				status: motorcycleMaintenance.status,
				date: motorcycleMaintenance.date,
			},
		});
	}

	public async findById(id: string): Promise<MotorcycleMaintenanceEntity | null> {
		const motorcycleMaintenance = await prisma.motorcycleMaintenance.findUnique({
			where: {
				id,
			},
			include: {
				usedSpareParts: {
					include: {
						sparePart: true,
					},
				},
			},
		});

		if (motorcycleMaintenance === null) {
			return null;
		}

		return this.mapper.toDomainEntity(motorcycleMaintenance);
	}

	public async update(
		motorcycleMaintenanceId: string,
		motorcycleMaintenance: MotorcycleMaintenanceEntity,
	): Promise<void> {
		await prisma.motorcycleMaintenance.update({
			where: {
				id: motorcycleMaintenanceId,
			},
			data: {
				technicalRecommendations: motorcycleMaintenance.technicalRecommendations,
				status: motorcycleMaintenance.status,
				laborPrice: motorcycleMaintenance.laborPrice,
				totalMaintenancePrice: motorcycleMaintenance.totalMaintenancePrice,
				totalSparePartsPrice: motorcycleMaintenance.totalSparePartsPrice,
			},
		});
	}

	public async findByStatus(status: MaintenanceStatus): Promise<MotorcycleMaintenanceEntity[]> {
		const motorcycleMaintenances = await prisma.motorcycleMaintenance.findMany({
			where: {
				status,
			},
			include: {
				usedSpareParts: {
					include: {
						sparePart: true,
					},
				},
			},
		});

		return motorcycleMaintenances.map((motorcycleMaintenance) => this.mapper.toDomainEntity(motorcycleMaintenance));
	}
}
