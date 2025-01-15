import type { RouteRecordRaw } from "vue-router";

export const routerPageNameAdminPanel = Object.freeze({
	DASHBOARD: "dashboard",
	MOTORBIKE_LIST: "motorbike-list",
	MOTORBIKE_ADD: "motorbike-add",
	MAINTENANCE_PLANNING: "maintenance-planning",
	MAINTENANCE_HISTORY: "maintenance-history",
});

export default (): RouteRecordRaw[] => [
	{
		path: "/dashboard",
		component: () => import("./layout/AdminLayout.vue"),
		children: [
			{
				name: routerPageNameAdminPanel.DASHBOARD,
				path: "/dashboard",
				component: () => import("./pages/AdminHomePage.vue"),
			},
			{
				name: routerPageNameAdminPanel.MOTORBIKE_LIST,
				path: "/dashboard/motorbike-list",
				component: () => import("./pages/MotorbikeListPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.MOTORBIKE_ADD,
				path: "/dashboard/motorbike-add",
				component: () => import("./pages/MotorbikeAddPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.MAINTENANCE_PLANNING,
				path: "/dashboard/maintenance-planning",
				component: () => import("./pages/MaintenancePlanningPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.MAINTENANCE_HISTORY,
				path: "/dashboard/maintenance-history",
				component: () => import("./pages/MaintenanceHistoryPage.vue"),
			},
		],
	},
];
