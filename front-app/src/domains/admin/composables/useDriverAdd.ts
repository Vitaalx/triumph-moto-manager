import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { h } from "vue";
import { driverAddFormSchema } from "@/schemas/driverSchema";

const formSchema = toTypedSchema(driverAddFormSchema);

export function useDriverAdd() {
	const { handleSubmit, resetForm } = useForm({
		validationSchema: formSchema,
	});

	const onSubmit = handleSubmit((formData) => {
		console.log(formData);

		api.post("/driver", formData)
			.then(() => {
				toast({
					title: "Conducteur ajouté",
					description: h("pre",
						{ class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
						h("code", { class: "text-white" }, JSON.stringify(formData, null, 2))),
					variant: "success",
				});

				resetForm();
			})
			.catch((error) => {
				const errorMessage = error.response.data.message;

				switch (errorMessage) {
				case "driver.alreadyExists":
					toast({
						title: "Conducteur déjà existant",
						description: "Ce conducteur existe déjà",
						variant: "destructive",
					});
					break;
				default:
					toast({
						title: "Erreur",
						description: "Une erreur est survenue lors de l'ajout du conducteur",
						variant: "destructive",
					});
					break;
				}
			});
	});

	return {
		onSubmit,
	};
}
