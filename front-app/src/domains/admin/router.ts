import type { RouteRecordRaw } from "vue-router";

export const routerPageNameAdminPanel = Object.freeze({
	DASHBOARD: "dashboard",
	MOTORCYCLE_LIST: "motorcycle-list",
	MOTORCYCLE_ADD: "motorcycle-add",
	MOTORCYCLE_EDIT: "motorcycle-edit",
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
	DRIVER_PAGE: "driver-page",
	DRIVER_ADD: "driver-add",
	DRIVER_EDIT: "driver-edit",
	INCIDENT_HISTORY: "incident-history",
	TRY_MOTORCYCLE_CURRENT_LIST: "try-motorcycle-current-list",
	TRY_MOTORCYCLE_INCOMING_LIST: "try-motorcycle-incoming-list",
	TRY_MOTORCYCLE_HISTORY: "try-history",
	TRY_MOTORCYCLE_ADD: "try-motorcycle-add",
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
				name: routerPageNameAdminPanel.MOTORCYCLE_LIST,
				path: "/dashboard/motorcycle-list",
				component: () => import("./pages/MotorcycleListPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.MOTORCYCLE_ADD,
				path: "/dashboard/motorcycle-add",
				component: () => import("./pages/MotorcycleAddPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.MOTORCYCLE_EDIT,
				path: "/dashboard/motorcycle-edit/:licensePlate",
				component: () => import("./pages/MotorcycleEditPage.vue"),
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
				name: routerPageNameAdminPanel.DRIVER_PAGE,
				path: "/dashboard/driver-page/:driverId",
				component: () => import("./pages/DriverPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.DRIVER_ADD,
				path: "/dashboard/driver-add",
				component: () => import("./pages/DriverAddPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.DRIVER_EDIT,
				path: "/dashboard/driver-edit/:driverId",
				component: () => import("./pages/DriverEditPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.INCIDENT_HISTORY,
				path: "/dashboard/incident-history",
				component: () => import("./pages/IncidentHistoryPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.TRY_MOTORCYCLE_CURRENT_LIST,
				path: "/dashboard/try-motorcycle-current-list",
				component: () => import("./pages/TryMotorcycleListPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.TRY_MOTORCYCLE_INCOMING_LIST,
				path: "/dashboard/try-motorcycle-incoming-list",
				component: () => import("./pages/TryMotorcycleIncomingListPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.TRY_MOTORCYCLE_ADD,
				path: "/dashboard/try-motorcycle-add",
				component: () => import("./pages/TryMotorcycleAddPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.TRY_MOTORCYCLE_HISTORY,
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
