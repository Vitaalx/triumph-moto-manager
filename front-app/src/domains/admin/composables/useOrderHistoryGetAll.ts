import api from "@/lib/axios";
import type { Order } from "@/schemas/orderSchema";
import { ref } from "vue";

export function useOrderHistoryGetAll() {
	const orders = ref<Order[]>([]);
	const isLoading = ref(true);

	function getAllOrderHistory() {
		api.get("/parts-orders-delivered")
			.then((response) => {
				const formatterOrders = response.data.map((order: Order) => {
					return {
						...order,
						supplierName: order.supplierName.value,
					};
				});

				orders.value = formatterOrders;
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
