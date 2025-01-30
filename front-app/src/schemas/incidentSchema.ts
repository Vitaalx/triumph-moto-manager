import { z } from "zod";

export interface Incident {
	id: string,
	type: string,
	description: string,
	driverId: string,
	motorcycleId: { // = lisencePlate
		value: string,
	},
	incidentDate: string,
	incidentTime: string,
	location: string,
}

export interface formattedIncident {
	id: string,
	type: string,
	description: string,
	driverId: string,
	motorcycleId: string,
	incidentDate: string,
	incidentTime: string,
	location: string,
}

export const incidentAddFormSchema = z.object({
	type: z.string({ message: "Le type est obligatoire." })
		.regex(/^(ACCIDENT|INFRACTION)$/, { message: "Le type doit être ACCIDENT ou INFRACTION." }),
	description: z
		.string({ message: "La description est obligatoire." })
		.min(10, { message: "La description doit faire au moins 10 caractères." })
		.max(500, { message: "La description doit faire au maximum 500 caractères." }),
	driverId: z.string({ message: "Le pilote est obligatoire." }),
	motorcycleId: z.string({ message: "La moto est obligatoire." }),
	incidentDate: z.string({ message: "La date est obligatoire." }),
	incidentTime: z.
		string({ message: "L'heure est obligatoire." })
		.regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "L'heure doit être au format HH:MM." }),
	location: z.string({ message: "Le lieu est obligatoire." }),
});

export const incidentUpdateFormSchema = z.object({
	type: z.string({ message: "Le type est obligatoire." })
		.regex(/^(ACCIDENT|INFRACTION)$/, { message: "Le type doit être ACCIDENT ou INFRACTION." }),
	description: z
		.string({ message: "La description est obligatoire." })
		.min(10, { message: "La description doit faire au moins 10 caractères." })
		.max(500, { message: "La description doit faire au maximum 500 caractères." }),
	incidentDate: z.string({ message: "La date est obligatoire." }),
	incidentTime: z.
		string({ message: "L'heure est obligatoire." })
		.regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "L'heure doit être au format HH:MM." }),
	location: z.string({ message: "Le lieu est obligatoire." }),
});
