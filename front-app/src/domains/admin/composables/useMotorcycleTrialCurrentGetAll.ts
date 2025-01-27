import api from "@/lib/axios";
import type { formattedMotorcycleTrial, MotorcycleTrial } from "@/schemas/motorcycleTrialSchema";
import { ref } from "vue";

export function useMotorcycleTrialCurrentGetAll() {
	const motorcycleTrials = ref<formattedMotorcycleTrial[]>([]);
	const isLoading = ref(true);

	const fakeData = ref<formattedMotorcycleTrial[]>([ // TODO: remove this when works whith real data
		{
			id: "trial-id",
			driverId: "driver-id",
			motorcycleId: "motorcycle-id",
			startDate: "2025-02-01",
			endDate: "2025-02-02"
		}
	]);

	function getAllMotorcycleTrialCurrent() {
		api.get("/motorcycle-try")
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
				motorcycleTrials.value = fakeData.value; // TODO: try with real data
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
