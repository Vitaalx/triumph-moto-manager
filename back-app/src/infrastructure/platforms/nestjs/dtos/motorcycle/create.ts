import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class CreateMotorcycleDto extends createZodDto(
	z.object({
		licensePlate: z.string(),
		model: z.string(),
		year: z.number(),
		brand: z.string(),
		price: z.number(),
		maintenanceInterval: z.string(),
	}),
) {}
