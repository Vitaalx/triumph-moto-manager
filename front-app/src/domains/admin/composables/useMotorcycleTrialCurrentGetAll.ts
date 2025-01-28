import api from "@/lib/axios";
import type { formattedMotorcycleTrial, MotorcycleTrial } from "@/schemas/motorcycleTrialSchema";
import { ref } from "vue";

export function useMotorcycleTrialCurrentGetAll() {
	const motorcycleTrials = ref<formattedMotorcycleTrial[]>([]);
	const isLoading = ref(true);

	function getAllMotorcycleTrialCurrent() {
		api.get("/motorcycles-in-trial")
			.then((response) => {
				const formattedMotorcycleTrials = response.data.motorcycleTry.map(
					(MotorcycleTrial: MotorcycleTrial) => {
						return {
							...MotorcycleTrial,
							motorcycleId: MotorcycleTrial.motorcycleId.value,
						};
					});

				motorcycleTrials.value = formattedMotorcycleTrials;
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				isLoading.value = false;
			});
	}

	getAllMotorcycleTrialCurrent();

	return {
		isLoading,
		motorcycleTrials,
		getAllMotorcycleTrialCurrent,
	};
}
