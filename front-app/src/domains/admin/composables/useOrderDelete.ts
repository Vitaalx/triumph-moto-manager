import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";

export function useOrderDelete() {
	function deleteOrder(orderId: string) {
		api.delete(`/order/${orderId}`)
			.then(() => {
				toast({
					title: "Commande supprimée",
					description: "La commande a bien été supprimée.",
					variant: "success",
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return {
		deleteOrder,
	};
}
