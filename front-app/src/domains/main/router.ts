import type { RouteRecordRaw } from "vue-router";

export default (): RouteRecordRaw[] => [
	{
		name: "home",
		path: "/",
		component: () => import("./pages/HomePage.vue"),
	},
	{
		name: "about",
		path: "/about",
		component: () => import("./pages/AboutPage.vue"),
	},
	{
		name: "motorcycle-tests",
		path: "/motorcycle-tests",
		component: () => import("./pages/MotorcycleTestsPage.vue"),
	}
];

export const notFound = (): RouteRecordRaw => ({
	path: "/:notFoundPath(.*)*",
	children: [
		{
			name: "not-found",
			path: "/:notFoundPath(.*)*",
			component: () => import("./pages/NotFoundPage.vue"),
		},
	],
});
