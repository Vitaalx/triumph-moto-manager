import api from "@/lib/axios";
import type { SparePart } from "@/schemas/sparePartSchema";
import { ref } from "vue";

export function useSparePartGetAll() {
	const spareParts = ref<SparePart[]>([]);
	const isLoading = ref(true);

	function getAllSparePart() {
		api.get("/spare-parts")
			.then((response) => {
				spareParts.value = response.data;
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
