import api from "@/lib/axios";
import type { Order } from "@/schemas/orderSchema";
import { ref } from "vue";

export function useOrderCurrentGetAll() {
	const orders = ref<Order[]>([]);
	const isLoading = ref(true);

	function getAllOrderCurrent() {
		api.get("/parts-orders-in-delivery")
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

	getAllOrderCurrent();

	return {
		isLoading,
		orders,
		getAllOrderCurrent,
	};
}
