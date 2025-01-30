import { incidentUpdateFormSchema } from "@/schemas/incidentSchema";
import { toTypedSchema } from "@vee-validate/zod";
import { useIncidentGet } from "./useIncidentGet";
import { useForm } from "vee-validate";
import { ref, watch } from "vue";
import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";

const formSchema = toTypedSchema(incidentUpdateFormSchema);

export function useIncidentEdit(incidentId: string) {
	const { incident } = useIncidentGet(incidentId);
	const isLoaded = ref(false);

	const { handleSubmit, resetForm, values, setFieldValue } = useForm({
		validationSchema: formSchema,
		initialValues: {},
	});

	// Populate form when data available
	watch(
		() => incident.value,
		(newValue) => {
			console.log(newValue);

			if (Object.keys(newValue).length > 0) {
				resetForm({ values: newValue });
				isLoaded.value = true;
			}
		},
		{ immediate: true }
	);

	const onSubmit = handleSubmit((formData) => {
		api.patch(`/motorcycle-incident/${incidentId}`, formData)
			.then(() => {
				toast({
					title: "Incident modifié",
					description: "L'incident a bien été modifié.",
					variant: "success",
				});
			});
	});

	return {
		onSubmit,
		isLoaded,
		values,
		setFieldValue,
	};
}
