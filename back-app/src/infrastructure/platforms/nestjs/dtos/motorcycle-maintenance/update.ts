import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class UpdateMotorcycleMaintenanceDto extends createZodDto(
	z.object({
		technicalRecommendations: z.string(),
		usedSpareParts: z.object({
			sparePartId: z.string(),
			quantity: z.number(),
		}).array(),
		laborPrice: z.number(),
	}),
) {}
