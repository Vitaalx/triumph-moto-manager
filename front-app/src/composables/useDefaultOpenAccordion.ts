import { useRoute } from "vue-router";
import { routerPageName } from "@/router/routerPageName";
import { computed } from "vue";

export function useDefaultOpenAccordion() {
	const route = useRoute();
	const {
		MOTORCYCLE_LIST,
		MOTORCYCLE_ADD,
		MAINTENANCE_CURRENT_LIST,
		MAINTENANCE_HISTORY,
		MAINTENANCE_ADD,
		SPARE_PART_LIST,
		SPARE_PART_ADD,
		ORDER_CURRENT_LIST,
		ORDER_HISTORY,
		ORDER_ADD,
		// SPARE_PART_SUPPLIER_LIST,
		// SPARE_PART_SUPPLIER_ADD,
		// USER_LIST,
		// USER_ADD,
		// PERMISSION_MANAGEMENT,
		DRIVER_LIST,
		DRIVER_ADD,
		TRIAL_CURRENT_LIST,
		TRIAL_NEXT_LIST,
		TRIAL_HISTORY,
		TRIAL_ADD,
		INCIDENT_LIST,
		INCIDENT_ADD,
	} = routerPageName;

	const defaultOpenAccordion = computed(() => {
		const routeName: string = route.name?.toString() || "";

		const routeCategoryMap: Record<string, string> = {
			[MOTORCYCLE_LIST]: "fleet",
			[MOTORCYCLE_ADD]: "fleet",
			[MAINTENANCE_CURRENT_LIST]: "maintenance",
			[MAINTENANCE_HISTORY]: "maintenance",
			[MAINTENANCE_ADD]: "maintenance",
			[SPARE_PART_LIST]: "stock",
			[SPARE_PART_ADD]: "stock",
			[ORDER_CURRENT_LIST]: "stock",
			[ORDER_HISTORY]: "stock",
			[ORDER_ADD]: "stock",
			// [SPARE_PART_SUPPLIER_LIST]: "stock",
			// [SPARE_PART_SUPPLIER_ADD]: "stock",
			// [USER_LIST]: "users",
			// [USER_ADD]: "users",
			// [PERMISSION_MANAGEMENT]: "users",
			[DRIVER_LIST]: "users",
			[DRIVER_ADD]: "users",
			[TRIAL_CURRENT_LIST]: "trials",
			[TRIAL_NEXT_LIST]: "trials",
			[TRIAL_HISTORY]: "trials",
			[TRIAL_ADD]: "trials",
			[INCIDENT_LIST]: "trials",
			[INCIDENT_ADD]: "trials"
		};

		return routeCategoryMap[routeName] || "";
	});

	return { defaultOpenAccordion };
}
