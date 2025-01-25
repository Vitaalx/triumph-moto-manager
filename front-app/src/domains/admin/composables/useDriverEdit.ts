import { driverSchema } from "@/schemas/driverSchema";
import { toTypedSchema } from "@vee-validate/zod";
import { useDriverGet } from "./useDriverGet";
import { useForm } from "vee-validate";
import { ref, watch } from "vue";
import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";

const formSchema = toTypedSchema(driverSchema);

export function useDriverEdit(driverId: string) {
	const { driver } = useDriverGet(driverId);
	const isLoaded = ref(false);

	const { handleSubmit, resetForm } = useForm({
		validationSchema: formSchema,
		initialValues: {},
	});

	// Populate form when data available
	watch(
		() => driver.value,
		(newValue) => {
			if (Object.keys(newValue).length > 0) {
				resetForm({ values: newValue });
				isLoaded.value = true;
			}
		},
		{ immediate: true }
	);

	const onSubmit = handleSubmit((formData) => {
		api.patch(`/driver/${driverId}`, formData)
			.then(() => {
				toast({
					title: "Conducteur modifié",
					description: "Le conducteur a bien été modifié.",
					variant: "success",
				});
			});
	});

	return {
		onSubmit,
		isLoaded,
	};
}
