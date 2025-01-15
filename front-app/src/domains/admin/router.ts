import type { RouteRecordRaw } from "vue-router";

export const routerPageNameAdminPanel = Object.freeze({
	DASHBOARD: "dashboard",
	MOTORBIKE_LIST: "motorbike-list",
	MOTORBIKE_ADD: "motorbike-add",
	MAINTENANCE_PLANNING: "maintenance-planning",
	MAINTENANCE_HISTORY: "maintenance-history",
	PIECE_LIST: "piece-list",
	PIECE_ADD: "piece-add",
	PIECE_DELIVERY_HISTORY: "piece-delivery-history",
	PIECE_SUPPLIER_LIST: "piece-supplier-list",
	PIECE_SUPPLIER_ADD: "piece-supplier-add",
	USER_LIST: "user-list",
	USER_ADD: "user-add",
	PERMISSION_MANAGEMENT: "permission-management",
	DRIVER_LIST: "driver-list",
	DRIVER_ADD: "driver-add",
	INCIDENT_HISTORY: "incident-history",
	TRY_MOTORBIKE_LIST: "try-motorbike-list",
	TRY_HISTORY: "try-history",
	TROUBLESHOOTING_ADD: "troubleshooting-add",
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
			{
				name: routerPageNameAdminPanel.PIECE_LIST,
				path: "/dashboard/piece-list",
				component: () => import("./pages/PieceListPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.PIECE_ADD,
				path: "/dashboard/piece-add",
				component: () => import("./pages/PieceAddPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.PIECE_DELIVERY_HISTORY,
				path: "/dashboard/piece-delivery-history",
				component: () => import("./pages/PieceDeliveryHistoryPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.PIECE_SUPPLIER_LIST,
				path: "/dashboard/piece-supplier-list",
				component: () => import("./pages/PieceSupplierListPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.PIECE_SUPPLIER_ADD,
				path: "/dashboard/piece-supplier-add",
				component: () => import("./pages/PieceSupplierAddPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.USER_LIST,
				path: "/dashboard/user-list",
				component: () => import("./pages/UserListPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.USER_ADD,
				path: "/dashboard/user-add",
				component: () => import("./pages/UserAddPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.PERMISSION_MANAGEMENT,
				path: "/dashboard/permission-management",
				component: () => import("./pages/PermissionManagementPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.DRIVER_LIST,
				path: "/dashboard/driver-list",
				component: () => import("./pages/DriverListPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.DRIVER_ADD,
				path: "/dashboard/driver-add",
				component: () => import("./pages/DriverAddPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.INCIDENT_HISTORY,
				path: "/dashboard/incident-history",
				component: () => import("./pages/IncidentHistoryPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.TRY_MOTORBIKE_LIST,
				path: "/dashboard/try-motorbike-list",
				component: () => import("./pages/TryMotorbikeListPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.TRY_HISTORY,
				path: "/dashboard/try-history",
				component: () => import("./pages/TryHistoryPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.TROUBLESHOOTING_ADD,
				path: "/dashboard/troubleshooting-add",
				component: () => import("./pages/TroubleshootingAddPage.vue"),
			}
		],
	},
];
