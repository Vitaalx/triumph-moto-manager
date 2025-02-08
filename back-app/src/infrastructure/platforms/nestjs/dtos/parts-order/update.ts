import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class UpdatePartsOrderDto extends createZodDto(
	z.object({
		supplierName: z.string(),
		parts: z.object({
			sparePartId: z.string(),
			quantity: z.number(),
		}).array(),
	}),
) {}
