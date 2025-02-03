import type { RouteRecordRaw } from "vue-router";

export const routerPageNameAdminPanel = Object.freeze({
	DASHBOARD: "dashboard",
	MOTORCYCLE_LIST: "motorcycle-list",
	MOTORCYCLE_PAGE: "motorcycle-page",
	MOTORCYCLE_ADD: "motorcycle-add",
	MOTORCYCLE_EDIT: "motorcycle-edit",
	MAINTENANCE_CURRENT_LIST: "maintenance-current-list",
	MAINTENANCE_HISTORY: "maintenance-history",
	MAINTENANCE_PAGE: "maintenance-page",
	MAINTENANCE_ADD: "maintenance-add",
	MAINTENANCE_EDIT: "maintenance-edit",
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
	TRIAL_CURRENT_LIST: "trial-current-list",
	TRIAL_NEXT_LIST: "trial-incoming-list",
	TRIAL_HISTORY: "trial-history",
	TRIAL_ADD: "trial-add",
	INCIDENT_LIST: "incident-list",
	INCIDENT_ADD: "incident-add",
	INCIDENT_EDIT: "incident-edit",
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
				name: routerPageNameAdminPanel.MOTORCYCLE_PAGE,
				path: "/dashboard/motorcycle-page/:licensePlate",
				component: () => import("./pages/MotorcyclePage.vue"),
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
				name: routerPageNameAdminPanel.MAINTENANCE_CURRENT_LIST,
				path: "/dashboard/maintenance-current-list",
				component: () => import("./pages/MaintenanceCurrentListPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.MAINTENANCE_HISTORY,
				path: "/dashboard/maintenance-history",
				component: () => import("./pages/MaintenanceHistoryPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.MAINTENANCE_PAGE,
				path: "/dashboard/maintenance-page/:maintenanceId",
				component: () => import("./pages/MaintenancePage.vue"),
			},
			{
				name: routerPageNameAdminPanel.MAINTENANCE_ADD,
				path: "/dashboard/maintenance-add",
				component: () => import("./pages/MaintenanceAddPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.MAINTENANCE_EDIT,
				path: "/dashboard/maintenance-edit/:maintenanceId",
				component: () => import("./pages/MaintenanceEditPage.vue"),
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
				name: routerPageNameAdminPanel.TRIAL_CURRENT_LIST,
				path: "/dashboard/trial-current-list",
				component: () => import("./pages/TrialCurrentListPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.TRIAL_NEXT_LIST,
				path: "/dashboard/trial-incoming-list",
				component: () => import("./pages/TrialNextListPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.TRIAL_ADD,
				path: "/dashboard/trial-add",
				component: () => import("./pages/TrialAddPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.TRIAL_HISTORY,
				path: "/dashboard/trial-history",
				component: () => import("./pages/TrialHistoryPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.INCIDENT_LIST,
				path: "/dashboard/incident-list",
				component: () => import("./pages/IncidentListPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.INCIDENT_ADD,
				path: "/dashboard/incident-add",
				component: () => import("./pages/IncidentAddPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.INCIDENT_EDIT,
				path: "/dashboard/incident-add/:incidentId",
				component: () => import("./pages/IncidentEditPage.vue"),
			},
		],
	},
];
