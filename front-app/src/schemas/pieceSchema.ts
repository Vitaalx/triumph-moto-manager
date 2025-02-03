import { z } from "zod";

export const pieceSchema = z.object({
	id: z.string(),
	brand: z.string(),
	name: z.string(),
	stock: z.number(),
	price: z.number(),
});

export type Piece = z.infer<typeof pieceSchema>;
