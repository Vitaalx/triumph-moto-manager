import { maintenanceUpdateFormSchema } from "@/schemas/maintenanceSchema";
import { toTypedSchema } from "@vee-validate/zod";
import { useMaintenanceGet } from "./useMaintenanceGet";
import { useForm } from "vee-validate";
import { ref, watch } from "vue";
import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";

const formSchema = toTypedSchema(maintenanceUpdateFormSchema);

export function useMaintenanceEdit(maintenanceId: string) {
	const { maintenance } = useMaintenanceGet(maintenanceId);
	const isLoaded = ref(false);
	const status = ref("");

	const { handleSubmit, resetForm, values, setFieldValue } = useForm({
		validationSchema: formSchema,
		initialValues: {},
	});

	// Populate form when data available
	watch(
		() => maintenance.value,
		(newValue) => {
			if (Object.keys(newValue).length > 0) {
				resetForm({ values: newValue });
				isLoaded.value = true;
				status.value = newValue.status;
			}
		},
		{ immediate: true }
	);

	const onSubmit = handleSubmit((formData) => {
		api.patch(`/motorcycle-maintenance/${maintenanceId}`, formData)
			.then(() => {
				toast({
					title: "Maintenance modifié",
					description: "La maintenance a bien été modifiée.",
					variant: "success",
				});
			});
	});

	return {
		onSubmit,
		isLoaded,
		status,
		values,
		setFieldValue,
	};
}
