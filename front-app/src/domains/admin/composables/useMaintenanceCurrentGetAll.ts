import api from "@/lib/axios";
import type { formattedMaintenance, Maintenance } from "@/schemas/maintenanceSchema";
import { ref } from "vue";

export function useMaintenanceCurrentGetAll() {
	const maintenances = ref<formattedMaintenance[]>([]);
	const isLoading = ref(true);

	function getAllMaintenanceCurrent() {
		api.get("/motorcycles-in-maintenance")
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
						technicalRecommendations: "Besoin de changer les pneus.",
						usedSpareParts: [
						  	{
								id: "spare-part-1",
								quantity: 2,
						  	}	
						],
						totalSparePartsCost: 120,
						totalCost: 160,
						status: "En cours",
						date: "2025-02-10",
					  }
				];
			});
	}

	getAllMaintenanceCurrent();

	return {
		isLoading,
		maintenances,
		getAllMaintenanceCurrent,
	};
}
