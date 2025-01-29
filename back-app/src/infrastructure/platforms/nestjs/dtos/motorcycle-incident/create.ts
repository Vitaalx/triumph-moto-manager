import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class CreateMotorcycleIncidentDto extends createZodDto(
	z.object({
		type: z.string(),
		description: z.string(),
		motorcycleId: z.string(),
		driverId: z.string(),
		incidentDate: z.coerce.date(),
		incidentTime: z.string(),
		location: z.string(),
	}),
) {}
