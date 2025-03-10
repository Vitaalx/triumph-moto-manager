import {
	mdiMotorbike,
	mdiPlus,
	mdiCalendarClock,
	mdiHistory,
	mdiFormatListBulleted,
	// mdiAccountHardHat,
	// mdiAccountGroup,
	// mdiAccountPlus,
	// mdiCards,
	mdiCardAccountDetails,
	mdiAlert
} from "@mdi/js";
import { routerPageName } from "@/router/routerPageName";

interface NavItem {
    icon?: string;
    route: string;
    label: string;
}
interface NavSection {
    title: string;
    value: string;
    items: NavItem[];
}

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
const adminNavSections: NavSection[] = [
	{
		title: "Gestion de flotte",
		value: "fleet",
		items: [
			{
				icon: mdiMotorbike, route: MOTORCYCLE_LIST, label: "Liste des motos" 
			},
			{
				icon: mdiPlus, route: MOTORCYCLE_ADD, label: "Ajouter une moto" 
			}
		]
	},
	{
		title: "Gestion des entretiens",
		value: "maintenance",
		items: [
			{
				icon: mdiCalendarClock, route: MAINTENANCE_CURRENT_LIST, label: "Entretiens en cours" 
			},
			{
				icon: mdiHistory, route: MAINTENANCE_HISTORY, label: "Historique des entretiens" 
			},
			{
				icon: mdiPlus, route: MAINTENANCE_ADD, label: "Créer un entretien" 
			}
		]
	},
	{
		title: "Gestion des stocks",
		value: "stock",
		items: [
			{
				icon: mdiFormatListBulleted, route: SPARE_PART_LIST, label: "Liste des pièces détachées" 
			},
			{
				icon: mdiPlus, route: SPARE_PART_ADD, label: "Ajouter une pièce" 
			},
			{
				icon: mdiCalendarClock, route: ORDER_CURRENT_LIST, label: "Commandes en cours"
			},
			{
				icon: mdiHistory, route: ORDER_HISTORY, label: "Historique des commandes" 
			},
			{
				icon: mdiPlus, route: ORDER_ADD, label: "Créer une commande" 
			},
			// {
			// 	icon: mdiAccountHardHat, route: SPARE_PART_SUPPLIER_LIST, label: "Liste des fournisseurs" 
			// },
			// {
			// 	icon: mdiPlus, route: SPARE_PART_SUPPLIER_ADD, label: "Ajouter un fournisseur" 
			// }
		]
	},
	{
		title: "Gestions des utilisateurs",
		value: "users",	
		items: [
			// {
			// 	icon: mdiAccountGroup, route: USER_LIST, label: "Liste des utilisateurs" 
			// },
			// {
			// 	icon: mdiAccountPlus, route: USER_ADD, label: "Ajouter un utilisateur" 
			// },
			// {
			// 	icon: mdiCards, route: PERMISSION_MANAGEMENT, label: "Permissions et rôles" 
			// },
			{
				icon: mdiCardAccountDetails, route: DRIVER_LIST, label: "Liste des conducteurs" 
			},
			{
				icon: mdiPlus, route: DRIVER_ADD, label: "Ajouter un conducteur" 
			},
		]
	},
	{
		title: "Gestions des essais",
		value: "trials",
		items: [
			{
				icon: mdiMotorbike, route: TRIAL_CURRENT_LIST, label: "Essais en cours" 
			},
			{
				icon: mdiMotorbike, route: TRIAL_NEXT_LIST, label: "Essais à venir" 
			},
			{
				icon: mdiHistory, route: TRIAL_HISTORY, label: "Historique des essais" 
			},
			{
				icon: mdiPlus, route: TRIAL_ADD, label: "Ajouter un essai"
			},
			{
				icon: mdiFormatListBulleted, route: INCIDENT_LIST, label: "Liste des incidents" 
			},
			{
				icon: mdiAlert, route: INCIDENT_ADD, label: "Signaler un incident" 
			}
		]
	}
];

export default adminNavSections;
