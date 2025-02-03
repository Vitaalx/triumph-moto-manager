import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class CreateDriverDto extends createZodDto(
	z.object({
		name: z.string().nonempty(),
		firstname: z.string().nonempty(),
		email: z.string().nonempty(),
		age: z.number(),
		motorcycleLicenseType: z.string().nonempty(),
		drivingExperience: z.string().nonempty(),
	}),
) {}
