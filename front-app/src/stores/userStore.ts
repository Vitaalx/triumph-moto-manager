import api from "@/lib/axios";
import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";
import { type User } from "@/schemas/userSchema";

export const useUserStore = defineStore(
	"user",
	() => {
		const user = ref<User | null>(null);
		const isConnected = computed(() => !!user.value);

		onMounted(async () => {
			const response = await api.get("/auth/test"); // TODO: improve this
 
			if (response.status === 200) {
				user.value = response.data;
			} else {
				user.value = null;
			}
		});

		return {
			user,
			isConnected,
		};
	}
);
