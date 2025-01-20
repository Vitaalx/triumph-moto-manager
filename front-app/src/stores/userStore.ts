import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { type User } from "@/schemas/userSchema";

export const useUserStore = defineStore(
	"user",
	() => {
		const user = ref<User | null>(null);
		const isConnected = computed(() => !!user.value);

		return {
			user,
			isConnected,
		};
	}
);
