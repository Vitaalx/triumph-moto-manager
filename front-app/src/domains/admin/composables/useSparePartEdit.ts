import { sparePartSchema } from "@/schemas/sparePartSchema";
import { toTypedSchema } from "@vee-validate/zod";
import { useSparePartGet } from "./useSparePartGet";
import { useForm } from "vee-validate";
import { ref, watch } from "vue";
import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";

const formSchema = toTypedSchema(sparePartSchema);

export function useSparePartEdit(sparePartId: string) {
	const { sparePart } = useSparePartGet(sparePartId);
	const isLoaded = ref(false);

	const { handleSubmit, resetForm } = useForm({
		validationSchema: formSchema,
		initialValues: {},
	});

	// Populate form when data available
	watch(
		() => sparePart.value,
		(newValue) => {
			if (Object.keys(newValue).length > 0) {
				resetForm({ values: newValue });
				isLoaded.value = true;
			}
		},
		{ immediate: true }
	);

	const onSubmit = handleSubmit((formData) => {
		console.log("formData", formData);

		api.patch(`/spare-part/${sparePartId}`, formData)
			.then(() => {
				toast({
					title: "Pièce modifiée",
					description: "La pièce a bien été modifiée.",
					variant: "success",
				});
			})
			.catch((error) => {
				const errorMessage = error.response?.data?.message || "Une erreur est survenue";

				toast({
					title: "Erreur",
					description: `Une erreur est survenue lors de l'ajout de la pièce : ${errorMessage}`,
					variant: "destructive",
				});
			});
	});

	return {
		onSubmit,
		isLoaded,
	};
}
