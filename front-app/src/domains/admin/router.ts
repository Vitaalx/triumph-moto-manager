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
	SPARE_PART_LIST: "spare-part-list",
	SPARE_PART_ADD: "spare-part-add",
	SPARE_PART_EDIT: "spare-part-edit",
	ORDER_CURRENT_LIST: "order-current-list",
	ORDER_HISTORY: "order-history",
	ORDER_PAGE: "order-page",
	ORDER_ADD: "order-add",
	ORDER_EDIT: "order-edit",
	// SPARE_PART_SUPPLIER_LIST: "spare-part-supplier-list",
	// SPARE_PART_SUPPLIER_ADD: "spare-part-supplier-add",
	// USER_LIST: "user-list",
	// USER_ADD: "user-add",
	// PERMISSION_MANAGEMENT: "permission-management",
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
				name: routerPageNameAdminPanel.SPARE_PART_LIST,
				path: "/dashboard/spare-part-list",
				component: () => import("./pages/SparePartListPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.SPARE_PART_ADD,
				path: "/dashboard/spare-part-add",
				component: () => import("./pages/SparePartAddPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.SPARE_PART_EDIT,
				path: "/dashboard/spare-part-edit/:sparePartId",
				component: () => import("./pages/SparePartEditPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.ORDER_CURRENT_LIST,
				path: "/dashboard/order-current-list",
				component: () => import("./pages/OrderCurrentListPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.ORDER_HISTORY,
				path: "/dashboard/order-history",
				component: () => import("./pages/OrderHistoryPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.ORDER_PAGE,
				path: "/dashboard/order-page/:orderId",
				component: () => import("./pages/OrderPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.ORDER_ADD,
				path: "/dashboard/order-add",
				component: () => import("./pages/OrderAddPage.vue"),
			},
			{
				name: routerPageNameAdminPanel.ORDER_EDIT,
				path: "/dashboard/order-edit/:orderId",
				component: () => import("./pages/OrderEditPage.vue"),
			},
			// {
			// 	name: routerPageNameAdminPanel.SPARE_PART_SUPPLIER_LIST,
			// 	path: "/dashboard/spare-part-supplier-list",
			// 	component: () => import("./pages/PieceSupplierListPage.vue"),
			// },
			// {
			// 	name: routerPageNameAdminPanel.SPARE_PART_SUPPLIER_ADD,
			// 	path: "/dashboard/spare-part-supplier-add",
			// 	component: () => import("./pages/PieceSupplierAddPage.vue"),
			// },
			// {
			// 	name: routerPageNameAdminPanel.USER_LIST,
			// 	path: "/dashboard/user-list",
			// 	component: () => import("./pages/UserListPage.vue"),
			// },
			// {
			// 	name: routerPageNameAdminPanel.USER_ADD,
			// 	path: "/dashboard/user-add",
			// 	component: () => import("./pages/UserAddPage.vue"),
			// },
			// {
			// 	name: routerPageNameAdminPanel.PERMISSION_MANAGEMENT,
			// 	path: "/dashboard/permission-management",
			// 	component: () => import("./pages/PermissionManagementPage.vue"),
			// },
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
