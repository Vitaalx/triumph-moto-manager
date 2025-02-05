import { z } from "zod";

interface SparePart {
	sparePartId : string,
	quantity: number,
}

export interface Order {
	id: string,
	supplierName: string,
	parts: SparePart[],
}

export const orderFormSchema = z.object({
	supplierName: z
		.string({ message: "Le nom du fournisseur est obligatoire." })
		.min(2, { message: "Le nom du fournisseur doit faire au moins 2 caractères." }),
	parts: z.array(
		z.object({
			sparePartId: z.string(),
			quantity: z.number(),
		}), 
		{ message: "Les pièces sont obligatoires." }
	).nonempty({ message: "Il faut au moins une pièce." }),
});
