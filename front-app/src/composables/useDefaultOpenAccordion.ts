import { useRoute } from "vue-router";
import { routerPageName } from "@/router/routerPageName";
import { computed } from "vue";

export function useDefaultOpenAccordion() {
	const route = useRoute();
	const {
		MOTORCYCLE_LIST,
		MOTORCYCLE_ADD,
		MAINTENANCE_PLANNING,
		MAINTENANCE_HISTORY,
		PIECE_LIST,
		PIECE_ADD,
		PIECE_DELIVERY_HISTORY,
		PIECE_SUPPLIER_LIST,
		PIECE_SUPPLIER_ADD,
		USER_LIST,
		USER_ADD,
		PERMISSION_MANAGEMENT,
		DRIVER_LIST,
		DRIVER_ADD,
		INCIDENT_HISTORY,
		MOTORCYCLE_TRIAL_CURRENT_LIST,
		MOTORCYCLE_TRIAL_NEXT_LIST,
		MOTORCYCLE_TRIAL_HISTORY,
		TRY_MOTORCYCLE_ADD,
		TROUBLESHOOTING_ADD
	} = routerPageName;

	const defaultOpenAccordion = computed(() => {
		const routeName: string = route.name?.toString() || "";

		const routeCategoryMap: Record<string, string> = {
			[MOTORCYCLE_LIST]: "fleet",
			[MOTORCYCLE_ADD]: "fleet",
			[MAINTENANCE_PLANNING]: "maintenance",
			[MAINTENANCE_HISTORY]: "maintenance",
			[PIECE_LIST]: "stock",
			[PIECE_ADD]: "stock",
			[PIECE_DELIVERY_HISTORY]: "stock",
			[PIECE_SUPPLIER_LIST]: "stock",
			[PIECE_SUPPLIER_ADD]: "stock",
			[USER_LIST]: "users",
			[USER_ADD]: "users",
			[PERMISSION_MANAGEMENT]: "users",
			[DRIVER_LIST]: "users",
			[DRIVER_ADD]: "users",
			[INCIDENT_HISTORY]: "users",
			[MOTORCYCLE_TRIAL_CURRENT_LIST]: "trials",
			[MOTORCYCLE_TRIAL_NEXT_LIST]: "trials",
			[MOTORCYCLE_TRIAL_HISTORY]: "trials",
			[TRY_MOTORCYCLE_ADD]: "trials",
			[TROUBLESHOOTING_ADD]: "trials"
		};

		return routeCategoryMap[routeName] || "";
	});

	return { defaultOpenAccordion };
}
