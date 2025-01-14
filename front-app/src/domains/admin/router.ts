import type { RouteRecordRaw } from "vue-router";

export const routerPageNameAdminPanel = Object.freeze({
	ADMIN_PANEL_HOME: "admin-panel",
});

export default (): RouteRecordRaw[] => [
	{
		path: "/admin-panel",
		component: () => import("./layout/AdminLayout.vue"),
		children: [
			{
				name: routerPageNameAdminPanel.ADMIN_PANEL_HOME,
				path: "/admin-panel",
				component: () => import("./pages/HomeAdminPanel.vue"),
			},
		],
	},
];
