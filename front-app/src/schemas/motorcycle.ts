import { z } from "zod";

export const motorcycleSchema = z.object({
	licensePlate: z.string(),
	brand: z.string(),
	model: z.string(),
	year: z.number(),
	price: z.number(),
	maintenanceInterval: z.string(),
	created_at: z.string(),
	updated_at: z.string(),
});

export type Motorcycle = z.infer<typeof motorcycleSchema>;
