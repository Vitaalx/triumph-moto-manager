import api from "@/lib/axios";
import type { SparePart } from "@/schemas/sparePartSchema";
import { ref } from "vue";

export function useSparePartGet(sparePartId: string) {

	const sparePart = ref<SparePart>({
		id: "",
		refNumber: "",
		brand: "",
		name: "",
		price: 0,
		stock: 0,
	});

	function getSparePart() {
		api.get(`/spare-part/${sparePartId}`)
			.then((response) => {
				
				sparePart.value = response.data;
			})
			.catch((error) => {
				console.error(error);
			});
	}

	getSparePart();

	return {
		sparePart,
		getSparePart,
	};
}
