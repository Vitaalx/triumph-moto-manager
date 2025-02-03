export class InsufficientSparePartStockError extends Error {
	public constructor(public readonly sparePartId: string) {
		super(`sparePart#${sparePartId}.hasInsufficientStock`);
	}
}
