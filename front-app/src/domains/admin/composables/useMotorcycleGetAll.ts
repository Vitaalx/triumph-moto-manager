import api from "@/lib/axios";
import type { Motorcycle } from "@/schemas/motorcycleSchema";
import { ref } from "vue";

interface UnformattedMotorcycle {
    licensePlate: {
        value: string;
    };
    brand: string;
    model: string;
    year: {
        value: number;
    };
    price: {
        value: number;
    };
    maintenanceInterval: string;
}
	

export function useMotorcycleGetAll() {
	const motorcycles = ref<Motorcycle[]>([]);


	function getAllMotorcycle() {
		api.get("/motorcycles")
			.then((response) => {
				const formattedMotorcycles = response.data.motorcycles.map((motorcycle: UnformattedMotorcycle) => {
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
