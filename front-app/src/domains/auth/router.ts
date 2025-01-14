import type { RouteRecordRaw } from "vue-router";

export default (): RouteRecordRaw[] => [
	{
		name: "connection",
		path: "/connection",
		component: () => import("./pages/ConnectionPage.vue"),
	},
];
