import api from "@/lib/axios";
import type { Order } from "@/schemas/orderSchema";
import { ref } from "vue";

export function useOrderGet(orderId: string) {
	const order = ref<Order>({
		id: "",
		supplierName: "",
		parts: [],
		totalPrice: 0,
		status: "",
		createDate: "",
	});

	const isLoading = ref(true);

	function getOrder() {
		api.get(`/parts-order/${orderId}`)
			.then((response) => {
				const formatterOrder = {
					...response.data,
					supplierName: response.data.supplierName.value,
				};

				order.value = formatterOrder;
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
