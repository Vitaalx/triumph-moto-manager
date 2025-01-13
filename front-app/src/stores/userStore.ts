import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { type User } from "@/schemas/userSchema";
import Cookies from "js-cookie";

export const useUserStore = defineStore(
	"user",
	() => {
		const user = ref<User | null>(null);
		const accessToken = ref<string | null>(Cookies.get("accessToken") || null);
		const isConnected = computed(() => !!accessToken.value);

		function removeAccessToken() {
			Cookies.remove("accessToken");
			accessToken.value = null;
		}

		return {
			removeAccessToken,
			user,
			accessToken,
			isConnected,
		};
	}
);
