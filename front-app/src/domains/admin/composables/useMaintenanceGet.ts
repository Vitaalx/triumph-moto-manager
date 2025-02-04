import api from "@/lib/axios";
import type { formattedMaintenance } from "@/schemas/maintenanceSchema";
import { ref } from "vue";

export function useMaintenanceGet(maintenanceId: string) {
	const maintenance = ref<formattedMaintenance>({
		id: "",
		status: "",
		driverId: "",
		motorcycleId: "",
		technicalRecommendations: "",
		usedSpareParts: [],
		totalSparePartsPrice: 0,
		laborPrice: 0,
		totalMaintenancePrice: 0,
		date: "",
	});

	const isLoading = ref(true);

	function getMaintenance() {
		api.get(`/motorcycle-maintenance/${maintenanceId}`)
			.then((response) => {
				const formattedMaintenance = {
					...response.data,
					motorcycleId: response.data.motorcycleId.value,
				};

				console.log(response.data);

				maintenance.value = formattedMaintenance;
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				isLoading.value = false;
			});
	}

	getMaintenance();

	return {
		isLoading,
		maintenance,
		getMaintenance,
	};
}
