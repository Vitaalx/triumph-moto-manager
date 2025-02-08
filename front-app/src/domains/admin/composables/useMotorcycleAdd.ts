import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { h } from "vue";
import { motorcycleFormSchema } from "@/schemas/motorcycleSchema";

const formSchema = toTypedSchema(motorcycleFormSchema);

export function useMotorcycleAdd() {
	const { handleSubmit, resetForm, values, setFieldValue } = useForm({
		validationSchema: formSchema,
	});

	const onSubmit = handleSubmit((formData) => {
		api.post("/motorcycle", formData)
			.then(() => {
				toast({
					title: "Moto ajoutée",
					description: h("pre",
						{ class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
						h("code", { class: "text-white" }, JSON.stringify(formData, null, 2))),
					variant: "success",
				});

				resetForm();
			})
			.catch((error) => {
				const errorMessage = error.response.data.message;

				switch (errorMessage) {
				case "motorcycle.alreadyExists":
					toast({
						title: "Moto déjà existante",
						description: "Cette moto existe déjà",
						variant: "destructive",
					});
					break;
				default:
					toast({
						title: "Erreur",
						description: "Une erreur est survenue lors de l'ajout de la moto",
						variant: "destructive",
					});
					break;
				}
			});
	});

	return {
		onSubmit,
		values,
		setFieldValue,
	};
}
