import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class CreatePartsOrderDto extends createZodDto(
	z.object({
		supplierName: z.string(),
		usedSpareParts: z.object({
			sparePartId: z.string(),
			quantity: z.number(),
		}).array(),
	}),
) {}
