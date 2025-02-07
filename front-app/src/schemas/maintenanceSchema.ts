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
	sparePartId : string,
	quantity: number,
	sparePart: {
		id: string,
		name: string,
		brand: string,
		refNumber: string,
		price: number,
		stock: number,
		createDate: string
	}
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
			sparePartId: z.string(),
			quantity: z.number(),
		}),
	).optional(),
	laborPrice: z.number({ message: "Le prix de la main d'oeuvre est obligatoire." }),
});
