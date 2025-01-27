import api from "@/lib/axios";
import type { formattedDriver, Driver } from "@/schemas/driverSchema";
import { ref } from "vue";

export function useDriverGetAll() {
	const drivers = ref<formattedDriver[]>([]);
	const isLoading = ref(true);

	const fakeData = ref<formattedDriver[]>([ // TODO: remove this when works whith real data
		{
			id: "driver-id",
			fullName: "Obo Bob",
			email: "bobo@gmai.com",
			age: 28,
			motorcycleLicenseType: "A",
			drivingExperience: "3 ans",
			motorcycles: [],
			motorcycleTries: [],
			incidents: [],
		}
	]);

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
				drivers.value = fakeData.value; // TODO: try with real data
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
