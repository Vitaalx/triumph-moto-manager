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
		TRY_MOTORCYCLE_CURRENT_LIST,
		TRY_MOTORCYCLE_INCOMING_LIST,
		TRY_MOTORCYCLE_HISTORY,
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
			[TRY_MOTORCYCLE_CURRENT_LIST]: "Essais",
			[TRY_MOTORCYCLE_INCOMING_LIST]: "Essais",
			[TRY_MOTORCYCLE_HISTORY]: "Essais",
			[TRY_MOTORCYCLE_ADD]: "Essais",
			[TROUBLESHOOTING_ADD]: "Essais"
		};

		return routeCategoryMap[routeName] || "";
	});

	return { defaultOpenAccordion };
}
