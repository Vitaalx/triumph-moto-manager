import api from "@/lib/axios";
import type { Order } from "@/schemas/orderSchema";
import { ref } from "vue";

export function useOrderGet(orderId: string) {
	const order = ref<Order>({
		id: "",
		supplierName: "",
		parts: [],
	});

	const isLoading = ref(true);

	function getOrder() {
		api.get(`/order/${orderId}`)
			.then((response) => {
				order.value = response.data;
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				isLoading.value = false;
			});
	}

	getOrder();

	return {
		isLoading,
		order,
		getOrder,
	};
}
