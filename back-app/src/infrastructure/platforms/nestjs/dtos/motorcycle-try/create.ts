import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class CreateMotorcycleTryDto extends createZodDto(
	z.object({
		driverId: z.string().nonempty(),
		motorcycleId: z.string().nonempty(),
		startDate: z.coerce.date(),
		endDate: z.coerce.date(),
	}),
) {}
