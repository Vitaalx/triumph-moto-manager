import { motorcycleFormSchema } from "@/schemas/motorcycleSchema";
import { toTypedSchema } from "@vee-validate/zod";
import { useMotorcycleGet } from "./useMotorcycleGet";
import { useForm } from "vee-validate";
import { ref, watch } from "vue";
import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";

const formSchema = toTypedSchema(motorcycleFormSchema);

export function useMotorcycleEdit(licensePlate: string) {
	const { motorcycle } = useMotorcycleGet(licensePlate);
	const isLoaded = ref(false);

	const { handleSubmit, resetForm, values, setFieldValue } = useForm({
		validationSchema: formSchema,
		initialValues: {},
	});

	// Populate form when data available
	watch(
		() => motorcycle.value,
		(newValue) => {
			if (Object.keys(newValue).length > 0) {
				resetForm({ values: newValue });
				isLoaded.value = true;
			}
		},
		{ immediate: true }
	);

	const onSubmit = handleSubmit((formData) => {
		api.patch(`/motorcycle/${licensePlate}`, formData)
			.then(() => {
				toast({
					title: "Moto modifiée",
					description: "La moto a bien été modifiée.",
					variant: "success",
				});
			});
	});

	return {
		isLoaded,
		values,
		setFieldValue,
		onSubmit,
	};
}
