import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class CreateSparePartDto extends createZodDto(
	z.object({
		name: z.string(),
		brand: z.string(),
		refNumber: z.string(),
		price: z.number(),
		stock: z.number(),
	}),
) {}
