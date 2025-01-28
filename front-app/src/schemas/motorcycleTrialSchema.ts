import { z } from "zod";

export interface MotorcycleTrial {
	id: string,
	driverId: string,
	motorcycleId: { // = lisencePlate
		value: string
	},
	startDate: string,
	endDate: string
	}

export interface formattedMotorcycleTrial {
	id: string,
	driverId: string,
	motorcycleId: string,
	startDate: string,
	endDate: string
}

export const motorcycleTrialFormSchema = z.object({
	driverId: z.string({ message: "Le pilote est obligatoire." }),
	motorcycleId: z.string({ message: "La moto est obligatoire." }),
	startDate: z.string({ message: "La date de début est obligatoire." }),
	endDate: z.string({ message: "La date de fin est obligatoire." }),
});
