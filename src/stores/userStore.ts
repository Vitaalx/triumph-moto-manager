import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        isConnected: true,
        // TODO: replace with real user data
        user: {
            id: 1,
            email: 'john.doe@example.com',
            password: 'password',
            lastName: 'Doe',
            firstName: 'John',
            phone: '+1234567890',
            role: 'user',
        }
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
