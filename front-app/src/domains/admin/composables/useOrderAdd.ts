import { orderFormSchema } from "@/schemas/orderSchema";
import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { h } from "vue";

const formSchema = toTypedSchema(orderFormSchema);

export function useOrderAdd() {
	const { resetForm, values, setFieldValue, handleSubmit, } = useForm({
		validationSchema: formSchema,
	});

	const onSubmit = handleSubmit((formData) => {
		console.log(formData);
		api.post("/spare-part-order", formData)
			.then(() => {
				toast({
					title: "Commande créée",
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
					description: `Une erreur est survenue lors de la création de la commande : ${errorMessage}`,
					variant: "destructive",
				});
			});
	});

	return {
		values,
		setFieldValue,
		onSubmit,
	};
}
