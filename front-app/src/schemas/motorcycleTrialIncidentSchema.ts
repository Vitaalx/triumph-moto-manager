import { z } from "zod";

export interface MotorcycleTrialIncident {
	id: string,
	driverId: string,
	motorcycleId: { // = lisencePlate
		value: string,
	},
	description: string,
	}

export interface formattedMotorcycleTrialIncident {
	id: string,
	driverId: string,
	motorcycleId: string,
	description: string,
}

export const motorcycleTrialIncidentFormSchema = z.object({
	driverId: z.string({ message: "Le pilote est obligatoire." }),
	motorcycleId: z.string({ message: "La moto est obligatoire." }),
	description: z.string({ message: "La description est obligatoire." }),
});
