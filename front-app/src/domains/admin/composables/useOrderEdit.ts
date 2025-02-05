import { toTypedSchema } from "@vee-validate/zod";
import { orderFormSchema } from "@/schemas/orderSchema";
import { useOrderGet } from "./useOrderGet";
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";

const formSchema = toTypedSchema(orderFormSchema);

export function useOrderEdit(orderId: string) {
	const { order } = useOrderGet(orderId);
	const isLoaded = ref(false);

	const { resetForm, values, setFieldValue, handleSubmit, } = useForm({
		validationSchema: formSchema,
		initialValues: {},
	});

	// Populate form when data available
	watch(
		() => order.value,
		(newValue) => {
			if (Object.keys(newValue).length > 0) {
				resetForm({ values: newValue });
				isLoaded.value = true;
				console.log("Order data loaded", newValue);
			}
		},
		{ immediate: true }
	);

	const onSubmit = handleSubmit((formData) => {
		console.log(formData);

		api.patch(`/order/${orderId}`, formData)
			.then(() => {
				toast({
					title: "Commande modifiée",
					description: "La commande a bien été modifiée.",
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
