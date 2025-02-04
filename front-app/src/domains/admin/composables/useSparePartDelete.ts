import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";

export function useSparePartDelete() {
	function deleteSparePart(sparePartId: string) {
		api.delete(`/spare-part/${sparePartId}`)
			.then(() => {
				toast({
					title: "Pièce supprimée",
					description: "La pièce a bien été supprimée.",
					variant: "success",
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return {
		deleteSparePart,
	};
}
