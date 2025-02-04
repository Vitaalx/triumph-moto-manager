import { z } from "zod";

export interface Maintenance {
	id: string,
	status: string,
	driverId: string,
	motorcycleId: { // = lisencePlate
		value: string
	},
	technicalRecommendations: string,
	usedSpareParts: [],
	totalSparePartsPrice: number,
	laborPrice: number,
	totalMaintenancePrice: number,
	date: string
	}


interface SparePart {
	id: string,
	quantity: number,
}

export interface formattedMaintenance {
	id: string,
	status: string,
	driverId: string,
	motorcycleId: string,
	technicalRecommendations: string,
	usedSpareParts: SparePart[],
	totalSparePartsPrice: number,
	laborPrice: number,
	totalMaintenancePrice: number,
	date: string
}

export const maintenanceAddFormSchema = z.object({
	driverId: z.string({ message: "Le pilote est obligatoire." }),
	motorcycleId: z.string({ message: "La moto est obligatoire." }),
});

export const maintenanceUpdateFormSchema = z.object({
	technicalRecommendations: z.
		string({ message: "Les recommandations techniques sont obligatoires." })
		.min(10, { message: "Les recommandations techniques doivent faire au moins 10 caractères." })
		.max(500, { message: "Les recommandations techniques doivent faire au plus 500 caractères." }),
	usedSpareParts: z.array(
		z.object({
			id: z.string(),
			quantity: z.number(),
		}),
	).optional(),
	totalSparePartsPrice: z.number({ message: "Le coût total des pièces est obligatoire." }),
	laborPrice: z.number({ message: "Le prix de la main d'oeuvre est obligatoire." }),
	totalMaintenancePrice: z.number({ message: "Le coût total est obligatoire." }),
	date: z.string({ message: "La date est obligatoire." }),
});
