import { incidentAddFormSchema } from "@/schemas/incidentSchema";
import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { h } from "vue";

const formSchema = toTypedSchema(incidentAddFormSchema);

export function useIncidentAdd() {
	const { handleSubmit, resetForm, values, setFieldValue } = useForm({
		validationSchema: formSchema,
	});

	const onSubmit = handleSubmit((formData) => {
		api.post("/motorcycle-incident", formData)
			.then(() => {
				toast({
					title: "L'incident a été ajouté",
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
					description: `Une erreur est survenue lors de l'ajout de l'incident : ${errorMessage}`,
					variant: "destructive",
				});
			});
	});

	return {
		onSubmit,
		values,
		setFieldValue
	};
}
