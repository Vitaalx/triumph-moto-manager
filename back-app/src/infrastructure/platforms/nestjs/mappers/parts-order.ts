import { Prisma } from "@prisma/client";
import { type EntityMapper } from "./common/entity-mapper";
import { PartsOrderEntity } from "@domain/entities/parts-order";
import { NormalizedString } from "@domain/types/string";
import { Injectable } from "@nestjs/common";

const _partsOrderWithParts = Prisma.validator<Prisma.PartsOrderDefaultArgs>()({
	include: {
		parts: true,
	},
});

type PartsOrderWithParts = Prisma.PartsOrderGetPayload<typeof _partsOrderWithParts>;

@Injectable()
export class PartsOrderMapper implements EntityMapper<PartsOrderWithParts, PartsOrderEntity> {
	public toDomainEntity(entity: PartsOrderWithParts): PartsOrderEntity {
		return new PartsOrderEntity(
			entity.id,
			entity.parts,
			new NormalizedString(entity.supplierName),
			entity.totalPrice,
			entity.createDate,
			entity.status,
		);
	}
}
