import { type PartsOrderStatus } from "@domain/types/parts-order-status";
import { type PartsOrderSparePartEntity } from "./parts-order-spare-parts";
import { NormalizedString } from "@domain/types/string";
import { randomUUID } from "crypto";

export class PartsOrderEntity {
	public constructor(
		public id: string,
		public parts: PartsOrderSparePartEntity[],
		public supplierName: NormalizedString,
		public totalPrice: number,
		public createDate: Date,
		public status: PartsOrderStatus,
	) {}

	public static create(
		supplierName: string,
	) {
		const supplierNameNormalized = NormalizedString.from(supplierName, "supplierName");

		if (supplierNameNormalized instanceof Error) {
			return supplierNameNormalized;
		}

		return new PartsOrderEntity(
			randomUUID(),
			[] as PartsOrderSparePartEntity[],
			supplierNameNormalized,
			0,
			new Date(),
			"IN_DELIVERY",
		);
	}
}
