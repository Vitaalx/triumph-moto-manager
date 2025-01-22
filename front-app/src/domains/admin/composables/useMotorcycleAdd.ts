import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";
import { h } from "vue";

const formSchema = toTypedSchema(
	z.object({
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
				/^[A-HJ-NP-Z]{2}-\d{3}-[A-HJ-NP-Z]{2}$/,
				{ message: "L'immatriculation doit être au format AA-123-BB." }
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
			.min(0, { message: "Le prix doit être supérieur ou égal à 0." })
			.max(1000000, { message: "Le prix doit être inférieur ou égal à 1 000 000." }),
		maintenanceInterval: z
			.string({ message: "L'intervalle de maintenance est obligatoire." })
			.regex(/^\d+\s?(km|KM|Km)$/, { message: "L'intervalle de maintenance doit être au format 'X km'." })
			.min(3, { message: "L'intervalle de maintenance doit être valide." }),
	})
);

export function useMotorcycleAdd() {
	const { handleSubmit, resetForm } = useForm({
		validationSchema: formSchema,
	});

	const onSubmit = handleSubmit(async (formData) => {
		try {
			await api.post("/motorcycle", formData);

			toast({
				title: "Moto ajoutée",
				description: h("pre",
					{ class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
					h("code", { class: "text-white" }, JSON.stringify(formData, null, 2))),
				variant: "success",
			});

			resetForm();
		} catch (error) {
			if (error.response.data.message === "motorcycle.alreadyExists") {
				toast({
					title: "Erreur",
					description: "La moto existe déjà.",
					variant: "destructive",
				});
			} else {
				toast({
					title: "Erreur inconnue",
					description: "Une erreur inattendue est survenue.",
					variant: "destructive",
				});
			}
		}
	});

	return {
		onSubmit,
	};
}
