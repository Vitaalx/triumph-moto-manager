import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class UpdateMotorcycleDto extends createZodDto(
	z.object({
		model: z.string(),
		year: z.number(),
		brand: z.string(),
		price: z.number(),
		maintenanceInterval: z.string(),
	}),
) {}
