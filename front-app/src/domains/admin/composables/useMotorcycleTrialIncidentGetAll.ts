import api from "@/lib/axios";
import type { formattedMotorcycleTrialIncident, MotorcycleTrialIncident } from "@/schemas/motorcycleTrialIncidentSchema";
import { ref } from "vue";

export function useMotorcycleTrialIncidentGetAll() {
	const motorcycleTrialIncident = ref<formattedMotorcycleTrialIncident[]>([]);
	const isLoading = ref(true);

	function getAllMotorcycleTrialIncident() {
		api.get("/motorcycle-incidents")
			.then((response) => {
				const formattedMotorcycleTrialIncident = response.data.motorcycleIncidents.map(
					(motorcycleIncident: MotorcycleTrialIncident) => {
						return {
							...motorcycleIncident,
							type: motorcycleIncident.type.value,
							motorcycleId: motorcycleIncident.motorcycleId.value,
						};
					});

				motorcycleTrialIncident.value = formattedMotorcycleTrialIncident;
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				isLoading.value = false;
			});
	}

	getAllMotorcycleTrialIncident();

	return {
		isLoading,
		motorcycleTrialIncident,
		getAllMotorcycleTrialIncident,
	};
}
