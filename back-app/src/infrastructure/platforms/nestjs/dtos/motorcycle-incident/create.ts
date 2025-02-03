import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class CreateMotorcycleIncidentDto extends createZodDto(
	z.object({
		type: z.string().nonempty(),
		description: z.string().nonempty(),
		motorcycleId: z.string().nonempty(),
		driverId: z.string().nonempty(),
		incidentDate: z.coerce.date(),
		incidentTime: z.string().nonempty(),
		location: z.string().nonempty(),
	}),
) {}
