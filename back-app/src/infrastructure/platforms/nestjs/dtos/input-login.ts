import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export class InputLoginDto extends createZodDto(
	z.object({
		email: z.string().email(),
		password: z.string(),
	}),
) {}
