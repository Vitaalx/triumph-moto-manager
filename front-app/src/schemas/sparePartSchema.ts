import { z } from "zod";

export interface SparePart {
	id: string;
	refNumber: string;
	brand: string;
	name: string;
	price: number;
	stock: number;
}

export const sparePartSchema = z.object({
	refNumber: z.string({ message: "La référence est obligatoire." }),
	brand: z.string({ message: "La marque est obligatoire." }),
	name: z.string({ message: "Le nom est obligatoire." }),
	price: z.number({ message: "Le prix est obligatoire." }),
	stock: z.number({ message: "Le stock est obligatoire." }),
});
