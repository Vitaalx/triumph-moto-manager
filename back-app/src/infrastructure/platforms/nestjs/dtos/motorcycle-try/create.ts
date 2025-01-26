import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class CreateMotorcycleTryDto extends createZodDto(
	z.object({
		driverId: z.string(),
		motorcycleId: z.string(),
		startDate: z.coerce.date(),
		endDate: z.coerce.date(),
	}),
) {}
