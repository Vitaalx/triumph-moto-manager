import api from "@/lib/axios";
import type { formattedMaintenance, Maintenance } from "@/schemas/maintenanceSchema";
import { ref } from "vue";

export function useMaintenanceHistoryGetAll() {
	const maintenances = ref<formattedMaintenance[]>([]);
	const isLoading = ref(true);

	function getAllMaintenanceHistory() {
		api.get("/motorcycles-maintenance-passed")
			.then((response) => {
				const formattedMaintenance = response.data.map(
					(motorcycleMaintenance: Maintenance) => {
						return {
							...motorcycleMaintenance,
							motorcycleId: motorcycleMaintenance.motorcycleId.value,
						};
					});

				maintenances.value = formattedMaintenance;
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				isLoading.value = false;
				maintenances.value = [ // Fake data
					{
						id: "maintenance-1",
						driverId: "driver-1",
						motorcycleId: "motorcycle-1",
						technicalRecommendations: "Besoin de changer les pneus",
						usedSpareParts: [
						  	{
								id: "spare-part-1",
								name: "Pneu",
								quantity: 2,
								unitCost: 60,
						  	}	
						],
						totalSparePartsCost: 120,
						totalCost: 160,
						status: "Terminé",
						date: "2025-02-10",
					  }
				];
			});
	}

	getAllMaintenanceHistory();

	return {
		isLoading,
		maintenances,
		getAllMaintenanceHistory,
	};
}
