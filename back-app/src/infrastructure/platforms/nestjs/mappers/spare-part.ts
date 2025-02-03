import { type SparePart } from "@prisma/client";
import { type EntityMapper } from "./common/entity-mapper";
import { SparePartEntity } from "@domain/entities/spare-part";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SparePartMapper implements EntityMapper<SparePart, SparePartEntity> {
	public toDomainEntity(entity: SparePart): SparePartEntity {
		return new SparePartEntity(
			entity.id,
			entity.name,
			entity.brand,
			entity.stock,
			entity.price,
		);
	}
}
