import api from "@/lib/axios";
import type { formattedTrial, Trial } from "@/schemas/trialSchema";
import { ref } from "vue";

export function useTrialCurrentGetAll() {
	const trials = ref<formattedTrial[]>([]);
	const isLoading = ref(true);

	function getAllTrialCurrent() {
		api.get("/motorcycles-in-trial")
			.then((response) => {
				const formattedMotorcycleTrials = response.data.map(
					(Trial: Trial) => {
						return {
							...Trial,
							motorcycleId: Trial.motorcycleId.value,
						};
					});

				trials.value = formattedMotorcycleTrials;
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				isLoading.value = false;
			});
	}

	getAllTrialCurrent();

	return {
		isLoading,
		trials,
		getAllTrialCurrent,
	};
}
