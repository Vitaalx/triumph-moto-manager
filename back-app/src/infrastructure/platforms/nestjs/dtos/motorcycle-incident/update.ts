import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class UpdateMotorcycleIncidentDto extends createZodDto(
	z.object({
		type: z.string(),
		description: z.string(),
		incidentDate: z.coerce.date(),
		incidentTime: z.string(),
		location: z.string(),
	}),
) {}
