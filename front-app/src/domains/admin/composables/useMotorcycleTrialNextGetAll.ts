import api from "@/lib/axios";
import type { formattedMotorcycleTrial, MotorcycleTrial } from "@/schemas/motorcycleTrialSchema";
import { ref } from "vue";

export function useMotorcycleTrialNextGetAll() {
	const motorcycleTrials = ref<formattedMotorcycleTrial[]>([]);
	const isLoading = ref(true);

	function getAllMotorcycleTrialNext() {
		api.get("/motorcycles-trial-comming")
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

	getAllMotorcycleTrialNext();

	return {
		isLoading,
		motorcycleTrials,
		getAllMotorcycleTrialNext,
	};
}
