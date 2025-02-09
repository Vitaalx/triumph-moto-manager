import { toTypedSchema } from "@vee-validate/zod";
import { orderFormSchema } from "@/schemas/orderSchema";
import { useRouter } from "vue-router";
import { routerPageName } from "@/router/routerPageName";
import { useOrderGet } from "./useOrderGet";
import { ref, watch } from "vue";
import { useForm } from "vee-validate";
import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";

const { ORDER_CURRENT_LIST } = routerPageName;

const formSchema = toTypedSchema(orderFormSchema);

export function useOrderEdit(orderId: string) {
	const router = useRouter();
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

		api.patch(`/parts-order/${orderId}`, formData)
			.then(() => {
				toast({
					title: "Commande modifiée",
					description: "La commande a bien été modifiée.",
					variant: "success",
				});
			}).catch((error) => {
				const errorMessage = error.response?.data?.message || "Une erreur est survenue";

				toast({
					title: "Erreur",
					description: `Une erreur est survenue lors de la modification de la commande : ${errorMessage}`,
					variant: "destructive",
				});
			});
	});

	function setDelivered() {
		api.patch(`/parts-order/${orderId}/delivered`)
			.then(() => {
				toast({
					title: "Commande livrée",
					description: "La commande a bien été marquée comme livrée.",
					variant: "success",
				});

				router.push({ name: ORDER_CURRENT_LIST });
			});
	}

	return {
		isLoaded,
		values,
		setFieldValue,
		onSubmit,
		setDelivered,
	};
}
