import { MotorcycleIncidentEntity } from "@domain/entities/motorcycle-incident";
import { type MotorcycleIncident } from "@prisma/client";
import { type EntityMapper } from "./common/entity-mapper";
import { IncidentType } from "@domain/types/incident-type";
import { MotorcycleLicensePlate } from "@domain/types/license-plate";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MotorcycleIncidentMapper implements EntityMapper<MotorcycleIncident, MotorcycleIncidentEntity> {
	public toDomainEntity(entity: MotorcycleIncident): MotorcycleIncidentEntity {
		return new MotorcycleIncidentEntity(
			entity.id,
			new IncidentType(entity.type),
			entity.description,
			new MotorcycleLicensePlate(entity.motorcycleId),
			entity.driverId,
			entity.date,
			entity.time,
			entity.location,
		);
	}
}
