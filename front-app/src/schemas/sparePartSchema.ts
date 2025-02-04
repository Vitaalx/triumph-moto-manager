import { z } from "zod";

export const sparePartSchema = z.object({
	id: z.string(),
	refNumber: z.string(),
	brand: z.string(),
	name: z.string(),
	price: z.number(),
	stock: z.number(),
});

export type SparePart = z.infer<typeof sparePartSchema>;
