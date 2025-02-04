import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class UpdateSparePartDto extends createZodDto(
	z.object({
		name: z.string(),
		brand: z.string(),
		price: z.number(),
		stock: z.number(),
	}),
) {}
