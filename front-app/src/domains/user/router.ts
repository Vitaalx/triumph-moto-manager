import type { RouteRecordRaw } from "vue-router";

export default (): RouteRecordRaw[] => [
	{
		name: "profile",
		path: "/profile",
		component: () => import("./pages/ProfilePage.vue"),
	},
];
