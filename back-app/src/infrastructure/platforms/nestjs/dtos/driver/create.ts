import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class CreateDriverDto extends createZodDto(
	z.object({
		name: z.string(),
		firstname: z.string(),
		email: z.string(),
		age: z.number(),
		motorcycleLicenseType: z.string(),
		drivingExperience: z.string(),
	}),
) {}
