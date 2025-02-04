import { type SparePart } from "@prisma/client";
import { type EntityMapper } from "./common/entity-mapper";
import { SparePartEntity } from "@domain/entities/spare-part";
import { Injectable } from "@nestjs/common";
import { NormalizedString } from "@domain/types/string";
import { SparePartPrice } from "@domain/types/spare-part-price";

@Injectable()
export class SparePartMapper implements EntityMapper<SparePart, SparePartEntity> {
	public toDomainEntity(entity: SparePart): SparePartEntity {
		return new SparePartEntity(
			entity.id,
			new NormalizedString(entity.name),
			new NormalizedString(entity.brand),
			new NormalizedString(entity.refNumber),
			entity.stock,
			new SparePartPrice(entity.price),
		);
	}
}
