import { type PartsOrderSparePartEntity } from "@domain/entities/parts-order-spare-parts";

export interface IPartsOrderSparePartsRepository {
	save(partsOrderSparePart: PartsOrderSparePartEntity): Promise<void>;
	update(partsOrderSparePartId: string, partsOrderSparePart: PartsOrderSparePartEntity): Promise<void>;
}
