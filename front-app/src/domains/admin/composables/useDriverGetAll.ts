import api from "@/lib/axios";
import type { formattedDriver, Driver } from "@/schemas/driverSchema";
import { ref } from "vue";

export function useDriverGetAll() {
	const drivers = ref<formattedDriver[]>([]);


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
			});
	}

	getAllDriver();

	return {
		drivers,
		getAllDriver,
	};
}
