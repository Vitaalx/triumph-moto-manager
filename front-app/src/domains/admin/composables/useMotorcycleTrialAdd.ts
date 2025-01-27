import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { h } from "vue";
import { z } from "zod";

const motorcycleTrialFormSchema = z.object({
	driver: z.string({ required_error: "Le pilote est obligatoire." }),
	motorcycle: z.string({ required_error: "La moto est obligatoire." }),
	startDate: z.string({ required_error: "La date de début est obligatoire." }),
	endDate: z.string({ required_error: "La date de fin est obligatoire." }),
});

const formSchema = toTypedSchema(motorcycleTrialFormSchema);

export function useMotorcycleTrialAdd() {
	const { handleSubmit, resetForm, values, setFieldValue } = useForm({
		validationSchema: formSchema,
	});

	const onSubmit = handleSubmit((formData) => {
		api.post("/motorcycle-try", formData)
			.then(() => {
				toast({
					title: "Essai moto ajouté",
					description: h("pre",
						{ class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
						h("code", { class: "text-white" }, JSON.stringify(formData, null, 2))),
					variant: "success",
				});

				resetForm();
			})
			.catch((error) => {
				const errorMessage = error.response?.data?.message || "Une erreur est survenue";

				toast({
					title: "Erreur",
					description: `Une erreur est survenue lors de l'ajout de l'essai moto: ${errorMessage}`,
					variant: "destructive",
				});
			});
	});

	return {
		onSubmit,
		values,
		setFieldValue,
	};
}
