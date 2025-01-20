import api from "@/lib/axios";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

export function useAuth() {
	const router = useRouter();
	const userStore = useUserStore();

	async function login(email: string, password: string) {
		try {
			const response = await api.post("/api/auth/login", { email, password });
			const userData = response.data;

			userStore.user = userData;

			await router.push("/");
		} catch (error) {
			console.error("Login failed:", error);
			throw error;
		}
	}

	function logout() {
		api.post("/api/auth/logout");
		userStore.user = null;
	}

	return { login, logout };
}
