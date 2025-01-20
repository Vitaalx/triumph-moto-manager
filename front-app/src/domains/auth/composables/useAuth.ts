import api from "@/lib/axios";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { toast } from "@/components/ui/toast";
import { h } from "vue";

export function useAuth() {
	const router = useRouter();
	const userStore = useUserStore();

	async function login(values: { email: string; password: string }) {
		try {
			const response = await api.post("/api/auth/login", values);
			const userData = response.data;

			userStore.user = userData;

			await router.push("/");
		} catch (error) {
			toast({
				title: "Identifiants incorrects",
				description: h("div", { innerHTML: "Veuillez vérifier vos identifiants" }),
				variant: "destructive"
			});
			throw error;
		}
	}

	function logout() {
		api.post("/api/auth/logout");
		userStore.user = null;
	}

	return { login, logout };
}
