import { driverUpdateFormSchema } from "@/schemas/driverSchema";
import { toTypedSchema } from "@vee-validate/zod";
import { useDriverGet } from "./useDriverGet";
import { useForm } from "vee-validate";
import { ref, watch } from "vue";
import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";

const formSchema = toTypedSchema(driverUpdateFormSchema);

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
			})
			.catch((error) => {
				const errorMessage = error.response?.data?.message || "Une erreur est survenue";

				toast({
					title: "Erreur",
					description: `Une erreur est survenue lors de la modification du conducteur : ${errorMessage}`,
					variant: "destructive",
				});
			});
	});

	function addMotorcycle(licensePlate: string) {
		api.post(`/driver/${driverId}/motorcycle/${licensePlate}`)
			.then(() => {
				toast({
					title: "Moto ajoutée",
					description: "La moto a bien été ajoutée au conducteur.",
					variant: "success",
				});
			})
			.catch((error) => {
				const errorMessage = error.response?.data?.message || "Une erreur est survenue";

				toast({
					title: "Erreur",
					description: `Une erreur est survenue lors de l'ajout de la moto : ${errorMessage}`,
					variant: "destructive",
				});
			});
	}

	function removeMotorcycle(licensePlate: string) {
		api.patch(`/driver/${driverId}/motorcycle/${licensePlate}`)
			.then(() => {
				toast({
					title: "Moto retirée",
					description: "La moto a bien été retirée du conducteur.",
					variant: "success",
				});
			})
			.catch((error) => {
				const errorMessage = error.response?.data?.message || "Une erreur est survenue";

				toast({
					title: "Erreur",
					description: `Une erreur est survenue lors du retrait de la moto : ${errorMessage}`,
					variant: "destructive",
				});
			});
	}

	return {
		isLoaded,
		driver,
		onSubmit,
		addMotorcycle,
		removeMotorcycle
	};
}
