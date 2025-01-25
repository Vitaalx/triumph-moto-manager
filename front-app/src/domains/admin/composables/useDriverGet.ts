import api from "@/lib/axios";
import type { Driver } from "@/schemas/driverSchema";
import { ref } from "vue";

export function useDriverGet(driverId: string) {
	const driver = ref<Driver>({
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

	function getDriver() {
		api.get(`/driver/${driverId}`)
			.then((response) => {
				const formattedDriver = {
					...response.data.driver,
					age: response.data.driver.age.value,
					email: response.data.driver.email.value,	
					fullName: response.data.driver.fullName.value,
					motorcycleLicenseType: response.data.driver.motorcycleLicenseType.value,
				};

				console.log(formattedDriver);

				driver.value = formattedDriver;
			})
			.catch((error) => {
				console.error(error);
			});
	}

	getDriver();

	return {
		driver,
		getDriver,
	};
}
