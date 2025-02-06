import { randomUUID } from "crypto";

export class PartsOrderSparePartEntity {
	public constructor(
		public id: string,
		public partsOrderId: string,
		public sparePartId: string,
		public quantity: number,
	) {
	}

	public static create(
		partsOrderId: string,
		sparePartId: string,
		quantity: number,
	) {
		return new PartsOrderSparePartEntity(
			randomUUID(),
			partsOrderId,
			sparePartId,
			quantity,
		);
	}
}
