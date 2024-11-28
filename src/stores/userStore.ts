
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        isConnected: false,
    }),
    actions: {
        login() {
            this.isConnected = true;
        },
        logout() {
            this.isConnected = false;
        }
    },
});
