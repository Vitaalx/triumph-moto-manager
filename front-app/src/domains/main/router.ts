import type { RouteRecordRaw } from "vue-router";

export const routerPageNameMain = Object.freeze({
	HOME: "home",
	ABOUT: "about",
	MOTORCYCLE_TESTS: "motorcycle-tests",
	NOTFOUND: "not-found",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameMain.HOME,
		path: "/",
		component: () => import("./pages/HomePage.vue"),
	},
	{
		name: routerPageNameMain.ABOUT,
		path: "/about",
		component: () => import("./pages/AboutPage.vue"),
	},
	{
		name: routerPageNameMain.MOTORCYCLE_TESTS,
		path: "/motorcycle-tests",
		component: () => import("./pages/MotorcycleTestsPage.vue"),
	}
];

export const notFound = (): RouteRecordRaw => ({
	path: "/:notFoundPath(.*)*",
	children: [
		{
			name: routerPageNameMain.NOTFOUND,
			path: "/:notFoundPath(.*)*",
			component: () => import("./pages/NotFoundPage.vue"),
		},
	],
});
