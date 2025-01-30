import api from "@/lib/axios";
import { toast } from "@/components/ui/toast";

export function useTrialDelete() {
	function deleteTrial(motorcycleTrialId: string) {
		api.delete(`/motorcycle-try/${motorcycleTrialId}`)
			.then(() => {
				toast({
					title: "Essai supprimé",
					description: "L'essai a bien été supprimé.",
					variant: "success",
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return {
		deleteTrial,
	};
}
