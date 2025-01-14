import { createRouter, createWebHistory } from "vue-router";
import main, { notFound } from "@/domains/main/router";
import auth from "@/domains/auth/router";
import user from "@/domains/user/router";
import admin from "@/domains/admin/router";
import { useLoader } from "@/composables/useLoader";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: () => import("../layouts/BaseLayout.vue"),
			children: [
				...main(),
				...auth(),
				...user(),
				notFound()
			],
		},
		...admin()
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { top: 0 };
		}
	}
});

const { setLoading } = useLoader();

router.beforeEach((to, from, next) => {
	setLoading(true);
	next();
});

router.afterEach(() => {
	setLoading(false);
});

export default router;
