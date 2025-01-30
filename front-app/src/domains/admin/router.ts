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
	MOTORCYCLE_TRIAL_CURRENT_LIST: "motorcycle-trial-current-list",
	MOTORCYCLE_TRIAL_NEXT_LIST: "motorcycle-trial-incoming-list",
	MOTORCYCLE_TRIAL_HISTORY: "motorcycle-trial-history",
	MOTORCYCLE_TRIAL_ADD: "motorcycle-trial-add",
	INCIDENT_HISTORY: "incident-history",
	INCIDENT_ADD: "incident-add",
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
				name: routerPageNameAdminPanel.MOTORCYCLE_TRIAL_CURRENT_LIST,
				path: "/dashboard/motorcycle-trial-current-list",
				component: () => import("./pages/MotorcycleTrialCurrentListPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.MOTORCYCLE_TRIAL_NEXT_LIST,
				path: "/dashboard/motorcycle-trial-incoming-list",
				component: () => import("./pages/MotorcycleTrialNextListPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.MOTORCYCLE_TRIAL_ADD,
				path: "/dashboard/motorcycle-trial-add",
				component: () => import("./pages/MotorcycleTrialAddPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.MOTORCYCLE_TRIAL_HISTORY,
				path: "/dashboard/motorcycle-trial-history",
				component: () => import("./pages/MotorcycleTrialHistoryPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.INCIDENT_HISTORY,
				path: "/dashboard/incident-history",
				component: () => import("./pages/MotorcycleTrialIncidentListPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.INCIDENT_ADD,
				path: "/dashboard/incident-add",
				component: () => import("./pages/MotorcycleTrialIncidentAddPage.vue"),
			},
		],
	},
];
