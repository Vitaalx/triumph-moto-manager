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
				maintenance.value = { // Fake data
					id: "maintenance-2",
					driverId: "driver-1",
					motorcycleId: "motorcycle-1",
					technicalRecommendations: "Besoin de changer les pneus.",
					usedSpareParts: [
						{
							id: "bhqecj4p",
							quantity: 2,
						},
					],
					totalSparePartsCost: 120,
					totalCost: 160,
					status: "En cours",
					date: "2025-02-10T00:00:00.000Z",
				};
			});
	}

	getMaintenance();

	return {
		isLoading,
		maintenance,
		getMaintenance,
	};
}
