import api from "@/lib/axios";
import type { Order } from "@/schemas/orderSchema";
import { ref } from "vue";

export function useOrderHistoryGetAll() {
	const orders = ref<Order[]>([]);
	const isLoading = ref(true);

	function getAllOrderHistory() {
		api.get("/orders-in-progress")
			.then((response) => {
				orders.value = response.data;
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				isLoading.value = false;
			});
	}

	getAllOrderHistory();

	return {
		isLoading,
		orders,
		getAllOrderHistory,
	};
}
