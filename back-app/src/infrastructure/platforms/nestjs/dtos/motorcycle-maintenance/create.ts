import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class CreateMotorcycleMaintenanceDto extends createZodDto(
	z.object({
		motorcycleId: z.string(),
		driverId: z.string(),
	}),
) {}
