import api from "@/lib/axios";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { toast } from "@/components/ui/toast";

export function useAuth() {
	const router = useRouter();
	const userStore = useUserStore();

	async function login(formData: { email: string; password: string }) {
		try {
			const response = await api.post("/api/auth/login", formData);
			const userData = response.data;

			userStore.user = userData;

			toast({
				title: "Connexion réussie !",
				description: "Vous êtes maintenant connecté.",
				variant: "success",
			});

			router.push("/");
		} catch (error) {
			if (error.response.data.message === "user.notfound") {
				toast({
					title: "Utilisateur introuvable",
					description: "Veuillez vérifier votre adresse email.",
					variant: "destructive",
				});
			} else if (error.response.data.message === "password.invalid") {
				toast({
					title: "Mot de passe incorrect",
					description: "Veuillez vérifier votre mot de passe.",
					variant: "destructive",
				});
			} else {
				toast({
					title: "Erreur inconnue",
					description: "Une erreur inattendue est survenue.",
					variant: "destructive",
				});
			}
		}
	}

	function logout() {
		api.post("/api/auth/logout");
		userStore.user = null;
	}

	return { login, logout };
}
