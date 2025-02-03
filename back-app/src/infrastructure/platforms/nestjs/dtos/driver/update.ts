import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class UpdateDriverDto extends createZodDto(
	z.object({
		age: z.number(),
		email: z.string().nonempty(),
		motorcycleLicenseType: z.string().nonempty(),
		drivingExperience: z.string().nonempty(),
	}),
) {}
