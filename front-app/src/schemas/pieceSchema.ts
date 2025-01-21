import { z } from "zod";

export const pieceSchema = z.object({
	id: z.string(),
	name: z.string(),
	price: z.number(),
	status: z.enum(["in stock", "low stock", "out of stock"]),
});

export type Piece = z.infer<typeof pieceSchema>;
