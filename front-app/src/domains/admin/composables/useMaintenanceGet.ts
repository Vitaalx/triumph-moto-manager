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
		totalSparePartsCost: 0,
		laborPrice: 0,
		totalCost: 0,
		date: "",
	});

	const isLoading = ref(true);

	function getMaintenance() {
		api.get(`/motorcycle-maintenance/${maintenanceId}`)
			.then((response) => {
				const formattedMaintenance = {
					...response.data,
					type: response.data.type.value,
					motorcycleId: response.data.motorcycleId.value,
				};

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
