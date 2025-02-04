import { z } from "zod";

export const sparePartSchema = z.object({
	id: z.string(),
	brand: z.string(),
	name: z.string(),
	stock: z.number(),
	price: z.number(),
});

export type SparePart = z.infer<typeof sparePartSchema>;
