import { toTypedSchema } from "@vee-validate/zod";
import { maintenanceUpdateFormSchema } from "@/schemas/maintenanceSchema";
import { useRouter } from "vue-router";
import { routerPageName } from "@/router/routerPageName";
import { useMaintenanceGet } from "./useMaintenanceGet";
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";

const { MAINTENANCE_CURRENT_LIST } = routerPageName;

const formSchema = toTypedSchema(maintenanceUpdateFormSchema);

export function useMaintenanceEdit(maintenanceId: string) {
	const router = useRouter();
	const { maintenance } = useMaintenanceGet(maintenanceId);
	const isLoaded = ref(false);

	const { resetForm, values, setFieldValue, handleSubmit, } = useForm({
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
			}
		},
		{ immediate: true }
	);

	const onSubmit = handleSubmit((formData) => {
		api.patch(`/motorcycle-maintenance/${maintenanceId}`, formData)
			.then(() => {
				toast({
					title: "Maintenance modifiée",
					description: "La maintenance a bien été modifiée.",
					variant: "success",
				});
			});
	});

	function closeMaintenance() {
		api.patch(`/motorcycle-maintenance/${maintenanceId}/close`)
			.then(() => {
				toast({
					title: "Maintenance clôturée",
					description: "La maintenance a bien été clôturée.",
					variant: "success",
				});

				router.push({ name: MAINTENANCE_CURRENT_LIST });
			});
	}

	return {
		isLoaded,
		values,
		setFieldValue,
		onSubmit,
		closeMaintenance,
	};
}
