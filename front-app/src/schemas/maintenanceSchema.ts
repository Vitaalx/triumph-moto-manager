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
	totalSparePartsCost: number,
	totalCost: number,
	date: string
	}

export interface formattedMaintenance {
	id: string,
	status: string,
	driverId: string,
	motorcycleId: string,
	technicalRecommendations: string,
	usedSpareParts: object[],
	totalSparePartsCost: number,
	totalCost: number,
	date: string
}

export const maintenanceAddFormSchema = z.object({
	driverId: z.string({ message: "Le pilote est obligatoire." }),
	motorcycleId: z.string({ message: "La moto est obligatoire." }),
});

export const maintenanceUpdateFormSchema = z.object({});
