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
		TRY_MOTORCYCLE_LIST,
		TRY_HISTORY,
		TROUBLESHOOTING_ADD
	} = routerPageName;

	const defaultOpenAccordion = computed(() => {
		const routeName: string = route.name?.toString() || "";

		const routeCategoryMap: Record<string, string> = {
			[MOTORCYCLE_LIST]: "fleet",
			[MOTORCYCLE_ADD]: "fleet",
			[MAINTENANCE_PLANNING]: "maintenance",
			[MAINTENANCE_HISTORY]: "maintenance",
			[PIECE_LIST]: "Stock",
			[PIECE_ADD]: "Stock",
			[PIECE_DELIVERY_HISTORY]: "Stock",
			[PIECE_SUPPLIER_LIST]: "Stock",
			[PIECE_SUPPLIER_ADD]: "Stock",
			[USER_LIST]: "Utilisateurs",
			[USER_ADD]: "Utilisateurs",
			[PERMISSION_MANAGEMENT]: "Utilisateurs",
			[DRIVER_LIST]: "Utilisateurs",
			[DRIVER_ADD]: "Utilisateurs",
			[INCIDENT_HISTORY]: "Utilisateurs",
			[TRY_MOTORCYCLE_LIST]: "Essais",
			[TRY_HISTORY]: "Essais",
			[TROUBLESHOOTING_ADD]: "Essais"
		};

		return routeCategoryMap[routeName] || "";
	});

	return { defaultOpenAccordion };
}
