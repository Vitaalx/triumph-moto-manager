import { z } from "zod";
import type { Motorcycle } from "./motorcycleSchema";
import type { Trial } from "./trialSchema";

export interface Driver {
	fullName: {
		value: string;
	}
	email: {
		value: string;
	}
	age: {
		value: number;
	}
	motorcycleLicenseType: {
		value: string;
	}
	drivingExperience: string;
	motorcycles: Motorcycle[];
	motorcycleTries: Trial[];
	incidents: [];
}

export interface formattedDriver {
	id: string;
	fullName: string;
	email: string;
	age: number;
	motorcycleLicenseType: string;
	drivingExperience: string;
	motorcycles: Motorcycle[];
	motorcycleTries: Trial[];
	incidents: [];
}

export const driverAddFormSchema = z.object({
	name: z
		.string({ message: "Le nom est obligatoire." })
		.min(2, { message: "Le nom doit contenir au moins 2 caractères." })
		.max(50, { message: "Le nom ne doit pas dépasser 50 caractères." }),
	firstname: z
		.string({ message: "Le prénom est obligatoire." })
		.min(2, { message: "Le prénom doit contenir au moins 2 caractères." })
		.max(50, { message: "Le prénom ne doit pas dépasser 50 caractères." }),
	email: z
		.string({ message: "L'adresse email est obligatoire." })
		.email({ message: "L'email doit être valide." }),
	age: z
		.number({ message: "L'âge est obligatoire." })
		.min(16, { message: "L'âge doit être supérieur ou égal à 16 ans." })
		.max(99, { message: "L'âge ne doit pas dépasser 99 ans." }),
	motorcycleLicenseType: z
		.string({ message: "Le type de permis est obligatoire." })
		.regex(/^(A1|A2|A)$/, { message: "Le type de permis doit être A1, A2 ou A." }),
	drivingExperience: z
		.string({ message: "L'expérience de conduite est obligatoire." })
		.regex(/^\d+\s?(an|ans)$/, { message: "L'expérience de conduite doit être au format 'X an(s)'." })
});

export const driverUpdateFormSchema = z.object({
	email: z
		.string({ message: "L'adresse email est obligatoire." })
		.email({ message: "L'email doit être valide." }),
	age: z
		.number({ message: "L'âge est obligatoire." })
		.min(16, { message: "L'âge doit être supérieur ou égal à 16 ans." })
		.max(99, { message: "L'âge ne doit pas dépasser 99 ans." }),
	motorcycleLicenseType: z
		.string({ message: "Le type de permis est obligatoire." })
		.regex(/^(A1|A2|A)$/, { message: "Le type de permis doit être A1, A2 ou A." }),
	drivingExperience: z
		.string({ message: "L'expérience de conduite est obligatoire." })
		.regex(/^\d+\s?(an|ans)$/, { message: "L'expérience de conduite doit être au format 'X an(s)'." })
});
