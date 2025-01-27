import api from "@/lib/axios";
import type { formattedMotorcycle, Motorcycle } from "@/schemas/motorcycleSchema";
import { ref } from "vue";

export function useMotorcycleGetAll() {
	const motorcycles = ref<formattedMotorcycle[]>([]);
	const isLoading = ref(true);

	const fakeData = ref<formattedMotorcycle[]>([ // TODO: remove this when works whith real data
		{
			brand: "Yamaha",
			model: "MT-07",
			licensePlate: "AA-123-BB",
			year: 2020,
			price: 7500,
			maintenanceInterval: "6000 km",
		}
	]);

	function getAllMotorcycle() {
		api.get("/motorcycles")
			.then((response) => {
				const formattedMotorcycles = response.data.motorcycles.map((motorcycle: Motorcycle) => {
					return {
						...motorcycle,
						licensePlate: motorcycle.licensePlate.value,
						year: motorcycle.year.value,
						price: motorcycle.price.value,
					};
				});

				motorcycles.value = formattedMotorcycles;
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				motorcycles.value = fakeData.value; // TODO: try with real data
				isLoading.value = false;
			});
	}

	getAllMotorcycle();

	return {
		isLoading,
		motorcycles,
		getAllMotorcycle,
	};
}
