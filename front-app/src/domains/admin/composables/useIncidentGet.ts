import api from "@/lib/axios";
import type { formattedIncident } from "@/schemas/incidentSchema";
import { ref } from "vue";

export function useIncidentGet(incidentId: string) {
	const incident = ref<formattedIncident>({
		id: "",
		type: "",
		description: "",
		driverId: "",
		motorcycleId: "",
		incidentDate: "",
		incidentTime: "",
		location: "",
	});

	const isLoading = ref(true);

	function getIncident() {
		api.get(`/motorcycle-incident/${incidentId}`)
			.then((response) => {
				const formattedIncident = {
					...response.data,
					type: response.data.type.value,
					motorcycleId: response.data.motorcycleId.value,
				};

				incident.value = formattedIncident;
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				isLoading.value = false;
			});
	}

	getIncident();

	return {
		isLoading,
		incident,
		getIncident,
	};
}
