import { IMotorcycleIncidentRepository } from "@application/ports/repositories/motorcycle-incident";
import { MotorcycleIncidentEntity } from "@domain/entities/motorcycle-incident";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";
import { Injectable } from "@nestjs/common";
import { MotorcycleIncidentMapper } from "../../mappers/motorcycle-incident";

@Injectable()
export class MotorcycleIncidentRepository implements IMotorcycleIncidentRepository {
	public constructor(private readonly mapper: MotorcycleIncidentMapper) {}

	public async update(id: string, motorcycleIncident: MotorcycleIncidentEntity): Promise<void> {
		await prisma.motorcycleIncident.update({
			where: {
				id,
			},
			data: {
				type: motorcycleIncident.type.value,
				description: motorcycleIncident.description,
				date: motorcycleIncident.incidentDate,
				time: motorcycleIncident.incidentTime,
				location: motorcycleIncident.location,
			},
		});
	}

	public async save(incident: MotorcycleIncidentEntity): Promise<void> {
		await prisma.motorcycleIncident.create({
			data: {
				id: incident.id,
				type: incident.type.value,
				description: incident.description,
				motorcycleId: incident.motorcycleId.value,
				driverId: incident.driverId,
				date: incident.incidentDate,
				time: incident.incidentTime,
				location: incident.location,
			},
		});
	}

	public async findByLicensePlate(licensePlate: MotorcycleLicensePlate): Promise<MotorcycleIncidentEntity | null> {
		const incident = await prisma.motorcycleIncident.findFirst({
			where: {
				motorcycleId: licensePlate.value,
			},
		});

		if (incident === null) {
			return null;
		}

		return this.mapper.toDomainEntity(incident);
	}

	public async findById(id: string): Promise<MotorcycleIncidentEntity | null> {
		const incident = await prisma.motorcycleIncident.findUnique({
			where: {
				id,
			},
		});

		if (incident === null) {
			return null;
		}

		return this.mapper.toDomainEntity(incident);
	}

	public async delete(motorcycleIncident: MotorcycleIncidentEntity): Promise<void> {
		await prisma.motorcycleIncident.delete({
			where: {
				id: motorcycleIncident.id,
			},
		});
	}

	public async getMotorcycleIncidents(): Promise<MotorcycleIncidentEntity[]> {
		const incidents = await prisma.motorcycleIncident.findMany();

		return incidents.map((incident) => this.mapper.toDomainEntity(incident));
	}
}
