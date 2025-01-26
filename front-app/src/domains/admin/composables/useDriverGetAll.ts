import api from "@/lib/axios";
import type { formattedDriver, Driver } from "@/schemas/driverSchema";
import { ref } from "vue";

export function useDriverGetAll() {
	const drivers = ref<formattedDriver[]>([]);
	const isLoading = ref(true);

	function getAllDriver() {
		api.get("/drivers")
			.then((response) => {
				const formattedDrivers = response.data.drivers.map((driver: Driver) => {
					return {
						...driver,
						fullName: driver.fullName.value,
						age: driver.age.value,
						email: driver.email.value,
						motorcycleLicenseType: driver.motorcycleLicenseType.value,
					};
				});

				drivers.value = formattedDrivers;
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				isLoading.value = false;
			});
	}

	getAllDriver();

	return {
		isLoading,
		drivers,
		getAllDriver,
	};
}
