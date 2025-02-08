import { z } from "zod";

export interface Motorcycle {
	brand: string;
	model: string;
	licensePlate: {
		value: string;
	}
	year: {
		value: number;
	}
	price: {
		value: number;
	}
	maintenanceInterval: string;
	warrantyEndDate?: string;
}

export interface formattedMotorcycle {
	brand: string;
	model: string;
	licensePlate: string;
	year: number;
	price: number;
	maintenanceInterval: string;
	warrantyEndDate?: string;
}

export const motorcycleFormSchema = z.object({
	brand: z
		.string({ message: "La marque est obligatoire." })
		.min(2, { message: "La marque doit contenir au moins 2 caractères." })
		.max(50, { message: "La marque ne doit pas dépasser 50 caractères." }),
	model: z
		.string({ message: "Le modèle est obligatoire." })
		.min(2, { message: "Le modèle doit contenir au moins 2 caractères." })
		.max(50, { message: "Le modèle ne doit pas dépasser 50 caractères." }),
	licensePlate: z
		.string({ message: "L'immatriculation est obligatoire." })
		.regex(
			/^[A-HJ-NP-Z]{2}-\d{3}-[A-HJ-NP-Z]{2}/,  
			{ message: "L'immatriculation doit être au format AA-123-BB, sans \"O\" ni \"I\"" }
		)
		.min(5, { message: "L'immatriculation doit contenir au moins 5 caractères." })
		.max(10, { message: "L'immatriculation ne doit pas dépasser 10 caractères." }),
	year: z
		.number({ message: "L'année est obligatoire." })
		.int({ message: "L'année doit être un nombre entier." })
		.min(1900, { message: "L'année doit être supérieure ou égale à 1900." })
		.max(new Date().getFullYear(), { message: "L'année ne peut pas être dans le futur." }),
	price: z
		.number({ message: "Le prix est obligatoire." })
		.min(1, { message: "Le prix doit être supérieur à 0." })
		.max(999999, { message: "Le prix doit être inférieur à 1 000 000." }),
	maintenanceInterval: z
		.string({ message: "L'intervalle de maintenance est obligatoire." })
		.regex(/^\d+\s?(km|KM|Km|fois par an)$/, { message: "L'intervalle de maintenance doit être au format 'X km' ou 'X fois par an'." })
		.min(3, { message: "L'intervalle de maintenance doit être valide." }),
	warrantyEndDate: z.string().optional()
});
