import { type PartsOrderEntity } from "@domain/entities/parts-order";
import { type PartsOrderStatus } from "@domain/types/parts-order-status";

export interface IPartsOrderRepository {
	save(partsOrder: PartsOrderEntity): Promise<void>;
	delete(partsOrderId: string): Promise<void>;
	findById(partsOrderId: string): Promise<PartsOrderEntity | null>;
	update(partsOrderId: string, partsOrder: PartsOrderEntity): Promise<void>;
	findAllByStatus(status: PartsOrderStatus): Promise<PartsOrderEntity[]>;
}
