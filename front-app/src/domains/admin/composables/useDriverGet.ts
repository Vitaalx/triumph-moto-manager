import api from "@/lib/axios";
import type { formattedDriver } from "@/schemas/driverSchema";
import { ref } from "vue";

export function useDriverGet(driverId: string) {
	const driver = ref<formattedDriver>({
		id: "",
		fullName: "",
		email: "",
		age: 0,
		motorcycleLicenseType: "",
		drivingExperience: "",
		motorcycles: [],
		motorcycleTries: [],
		incidents: [],
	});

	const isLoading = ref(true);

	function getDriver() {
		api.get(`/driver/${driverId}`)
			.then((response) => {
				const formattedDriver = {
					...response.data.driver,
					id: response.data.driver.id,
					age: response.data.driver.age.value,
					email: response.data.driver.email.value,	
					fullName: response.data.driver.fullName.value,
					motorcycleLicenseType: response.data.driver.motorcycleLicenseType.value,
				};

				driver.value = formattedDriver;
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				isLoading.value = false;
			});
	}

	getDriver();

	return {
		isLoading,
		driver,
		getDriver,
	};
}
