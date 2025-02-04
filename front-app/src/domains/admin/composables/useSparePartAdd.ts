import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { h } from "vue";
import { sparePartSchema } from "@/schemas/sparePartSchema";

const formSchema = toTypedSchema(sparePartSchema);

export function useSparePartAdd() {
	const { handleSubmit, resetForm } = useForm({
		validationSchema: formSchema,
	});

	const onSubmit = handleSubmit((formData) => {
		console.log(formData);

		api.post("/spare-part", formData)
			.then(() => {
				toast({
					title: "Pièce ajoutée",
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
					description: `Une erreur est survenue lors de l'ajout de la pièce : ${errorMessage}`,
					variant: "destructive",
				});
			});
	});

	return {
		onSubmit,
	};
}
