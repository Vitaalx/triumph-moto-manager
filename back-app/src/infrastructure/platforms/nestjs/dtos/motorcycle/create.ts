import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class CreateMotorcycleDto extends createZodDto(
	z.object({
		licensePlate: z.string().nonempty(),
		model: z.string().nonempty(),
		year: z.number(),
		brand: z.string().nonempty(),
		price: z.number(),
		maintenanceInterval: z.number(),
		mileage: z.number(),
		warrantyEndDate: z.coerce.date().optional(),
	}),
) {}
