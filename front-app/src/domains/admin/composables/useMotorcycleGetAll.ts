import api from "@/lib/axios";
import type { formattedMotorcycle, Motorcycle } from "@/schemas/motorcycleSchema";
import { ref } from "vue";

export function useMotorcycleGetAll() {
	const motorcycles = ref<formattedMotorcycle[]>([]);

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
			});
	}

	getAllMotorcycle();

	return {
		motorcycles,
		getAllMotorcycle,
	};
}
