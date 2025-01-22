import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";

export function useMotorcycleDelete() {
	function deleteMotorcycle(licensePlate: string) {
		api.delete(`/motorcycle/${licensePlate}`)
			.then(() => {
				toast({
					title: "Moto supprimée",
					description: "La moto a bien été supprimée.",
					variant: "success",
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return {
		deleteMotorcycle,
	};
}
