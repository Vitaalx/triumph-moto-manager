import api from "@/lib/axios";
import type { Motorcycle } from "@/schemas/motorcycleSchema";
import { ref } from "vue";

export function useMotorcycleGet(licensePlate: string) {
	const motorcycle = ref<Motorcycle>({
		brand: "",
		model: "",
		licensePlate: "",
		year: 0,
		price: 0,
		maintenanceInterval: "",
	});

	function getMotorcycle() {
		api.get(`/motorcycle/${licensePlate}`)
			.then((response) => {
				const formattedMotorcycle = {
					...response.data.motorcycle,
					licensePlate: response.data.motorcycle.licensePlate.value,
					year: response.data.motorcycle.year.value,
					price: response.data.motorcycle.price.value,
				};
				motorcycle.value = formattedMotorcycle;
			})
			.catch((error) => {
				console.error(error);
			});
	}

	getMotorcycle();

	return {
		motorcycle,
		getMotorcycle,
	};
}
