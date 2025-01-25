import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";

export function useDriverDelete() {
	function deleteDriver(driverId: string) {
		api.delete(`/driver/${driverId}`)
			.then(() => {
				toast({
					title: "Conducteur supprimé",
					description: "Le conducteur a bien été supprimé.",
					variant: "success",
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return {
		deleteDriver,
	};
}
