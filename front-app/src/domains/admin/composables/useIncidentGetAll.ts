import api from "@/lib/axios";
import type { formattedIncident, Incident } from "@/schemas/incidentSchema";
import { ref } from "vue";

export function useIncidentGetAll() {
	const incidents = ref<formattedIncident[]>([]);
	const isLoading = ref(true);

	function getAllIncident() {
		api.get("/motorcycle-incidents")
			.then((response) => {
				const formattedIncident = response.data.motorcycleIncidents.map(
					(motorcycleIncident: Incident) => {
						return {
							...motorcycleIncident,
							type: motorcycleIncident.type.value,
							motorcycleId: motorcycleIncident.motorcycleId.value,
						};
					});

				incidents.value = formattedIncident;
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				isLoading.value = false;
			});
	}

	getAllIncident();

	return {
		isLoading,
		incidents,
		getAllIncident,
	};
}
