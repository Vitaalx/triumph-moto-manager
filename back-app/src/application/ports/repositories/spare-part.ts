import { type SparePartEntity } from "@domain/entities/spare-part";

export interface ISparePartRepository {
	save(sparePart: SparePartEntity): Promise<void>;
	findById(id: string): Promise<SparePartEntity | null>;
	update(sparePartId: string, sparePart: SparePartEntity): Promise<void>;
}
