import api from "@/lib/axios";
import type { formattedMotorcycleTrial, MotorcycleTrial } from "@/schemas/motorcycleTrialSchema";
import { ref } from "vue";

export function useMotorcycleTrialHistoryGetAll() {
	const motorcycleTrials = ref<formattedMotorcycleTrial[]>([]);
	const isLoading = ref(true);

	function getAllMotorcycleTrialHistory() {
		api.get("/motorcycles-trial-passed")
			.then((response) => {
				const formattedMotorcycleTrials = response.data.map(
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

	getAllMotorcycleTrialHistory();

	return {
		isLoading,
		motorcycleTrials,
		getAllMotorcycleTrialHistory,
	};
}
