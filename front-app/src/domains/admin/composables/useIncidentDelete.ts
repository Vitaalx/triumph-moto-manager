import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";

export function useIncidentDelete() {
	function deleteIncident(incidentId: string) {
		api.delete(`/motorcycle-incident/${incidentId}`)
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
		deleteIncident,
	};
}
