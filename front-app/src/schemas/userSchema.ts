import { z } from "zod";

export const userSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	password: z.string(),
	roles: z.enum(["ADMIN", "FLEET_MANAGER"]),
});

export type User = z.infer<typeof userSchema>;
