import type { RouteRecordRaw } from "vue-router";

export const routerPageNameMain = Object.freeze({
	HOME_PAGE: "home",
	ABOUTE_PAGE: "about",
	// MOTORCYCLE_TESTS_PAGE: "motorcycle-tests",
	NOTFOUND_PAGE: "not-found",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameMain.HOME_PAGE,
		path: "/",
		component: () => import("./pages/HomePage.vue"),
	},
	{
		name: routerPageNameMain.ABOUTE_PAGE,
		path: "/about",
		component: () => import("./pages/AboutPage.vue"),
	},
	// {
	// 	name: routerPageNameMain.MOTORCYCLE_TESTS_PAGE,
	// 	path: "/motorcycle-tests",
	// 	component: () => import("./pages/MotorcycleTestsPage.vue"),
	// }
];

export const notFound = (): RouteRecordRaw => ({
	path: "/:notFoundPath(.*)*",
	children: [
		{
			name: routerPageNameMain.NOTFOUND_PAGE,
			path: "/:notFoundPath(.*)*",
			component: () => import("./pages/NotFoundPage.vue"),
		},
	],
});
