import api from "@/lib/axios";
import { routerPageName } from "@/router/routerPageName";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { toast } from "@/components/ui/toast";

export function useAuth() {
	const { HOME_PAGE } = routerPageName;
	const router = useRouter();
	const userStore = useUserStore();

	function login(formData: { email: string; password: string }) {
		api.post("/auth/login", formData)
			.then((response) => {
				const userData = response.data;

				userStore.user = userData;

				toast({
					title: "Connexion réussie !",
					description: "Vous êtes maintenant connecté.",
					variant: "success",
				});

				router.push({ name: HOME_PAGE });
			})
			.catch((error) => {
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
			});
	}

	function logout() {
		api.post("/auth/logout");
		userStore.user = null;
		router.push({ name: HOME_PAGE });
	}

	return { login, logout };
}
