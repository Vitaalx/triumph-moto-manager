import api from "@/lib/axios";
import type { formattedSparePart, SparePart } from "@/schemas/sparePartSchema";
import { ref } from "vue";

export function useSparePartGetAll() {
	const spareParts = ref<formattedSparePart[]>([]);
	const isLoading = ref(true);

	function getAllSparePart() {
		api.get("/spare-parts")
			.then((response) => {
				const formattedSparePart = response.data.map((pareParts: SparePart) => {
					return {
						...pareParts,
						refNumber: pareParts.refNumber.value,
						brand: pareParts.brand.value,
						name: pareParts.name.value,
						price: pareParts.price.value,
					};
				});

				spareParts.value = formattedSparePart;
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				isLoading.value = false;
			});
	}

	getAllSparePart();

	return {
		isLoading,
		spareParts,
		getAllSparePart,
	};
}
