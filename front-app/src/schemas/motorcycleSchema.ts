import { z } from "zod";

export const motorcycleSchema = z.object({
	licensePlate: z.object({ value: z.string() }) ,
	brand: z.string(),
	model: z.string(),
	year: z.object({ value: z.number() }),
	price: z.object({ value: z.number() }),
	maintenanceInterval: z.string()
});

export type Motorcycle = z.infer<typeof motorcycleSchema>;
