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
			});
	}

	getAllMaintenanceCurrent();

	return {
		isLoading,
		maintenances,
		getAllMaintenanceCurrent,
	};
}
