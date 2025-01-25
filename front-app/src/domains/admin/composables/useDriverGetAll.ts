import api from "@/lib/axios";
import type { Driver } from "@/schemas/driverSchema";
import type { Motorcycle } from "@/schemas/motorcycleSchema";
import { ref } from "vue";

interface UnformattedDriver {
    id: string;
	fullName: {
		value: string;
	},
	age: {
		value: number;
	},
	email: {
		value: string;
	},
	motorcycleLicenseType: {
		value: string;
	},
	drivingExperience: string;
	motorcycles: Motorcycle[];
	motorcycleTries: string[];
	incidents: string[];
}
	

export function useDriverGetAll() {
	const drivers = ref<Driver[]>([]);


	function getAllDriver() {
		api.get("/drivers")
			.then((response) => {
				const formattedDrivers = response.data.drivers.map((driver: UnformattedDriver) => {
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
