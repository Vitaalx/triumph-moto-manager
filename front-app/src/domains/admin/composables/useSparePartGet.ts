import api from "@/lib/axios";
import type { formattedSparePart } from "@/schemas/sparePartSchema";
import { ref } from "vue";

export function useSparePartGet(sparePartId: string) {

	const sparePart = ref<formattedSparePart>({
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
				// sparePart.value = response.data;

				const formattedSparePart = {
					...response.data,
					refNumber: response.data.refNumber.value,
					brand: response.data.brand.value,
					name: response.data.name.value,
					price: response.data.price.value,
				};
				
				sparePart.value = formattedSparePart;
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
