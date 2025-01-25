import {
	mdiMotorbike,
	mdiPlus,
	mdiCalendarClock,
	mdiHistory,
	mdiFormatListBulleted,
	mdiAccountHardHat,
	mdiAccountGroup,
	mdiAccountPlus,
	mdiCards,
	mdiCardAccountDetails,
	mdiAlert
} from "@mdi/js";
import { routerPageName } from "@/router/routerPageName";

interface NavItem {
    name: string;
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
const adminNavSections: NavSection[] = [
	{
		title: "Gestion de flotte",
		value: "fleet",
		items: [
			{
				name: "MOTORCYCLE_LIST", icon: mdiMotorbike, route: MOTORCYCLE_LIST, label: "Liste des motos" 
			},
			{
				name: "MOTORCYCLE_ADD", icon: mdiPlus, route: MOTORCYCLE_ADD, label: "Ajouter une moto" 
			}
		]
	},
	{
		title: "Gestion des entretiens",
		value: "maintenance",
		items: [
			{
				name: "MAINTENANCE_PLANNING", icon: mdiCalendarClock, route: MAINTENANCE_PLANNING, label: "Planification des entretiens" 
			},
			{
				name: "MAINTENANCE_HISTORY", icon: mdiHistory, route: MAINTENANCE_HISTORY, label: "Historique des entretiens" 
			}
		]
	},
	{
		title: "Gestion des stocks",
		value: "stock",
		items: [
			{
				name: "PIECE_LIST", icon: mdiFormatListBulleted, route: PIECE_LIST, label: "Liste des pièces détachées" 
			},
			{
				name: "PIECE_ADD", icon: mdiPlus, route: PIECE_ADD, label: "Ajouter une pièce" 
			},
			{
				name: "PIECE_DELIVERY_HISTORY", icon: mdiHistory, route: PIECE_DELIVERY_HISTORY, label: "Historique des commandes" 
			},
			{
				name: "PIECE_SUPPLIER_LIST", icon: mdiAccountHardHat, route: PIECE_SUPPLIER_LIST, label: "Liste des fournisseurs" 
			},
			{
				name: "PIECE_SUPPLIER_ADD", icon: mdiPlus, route: PIECE_SUPPLIER_ADD, label: "Ajouter un fournisseur" 
			}
		]
	},
	{
		title: "Gestions des utilisateurs",
		value: "users",	
		items: [
			{
				name: "USER_LIST", icon: mdiAccountGroup, route: USER_LIST, label: "Liste des utilisateurs" 
			},
			{
				name: "USER_ADD", icon: mdiAccountPlus, route: USER_ADD, label: "Ajouter un utilisateur" 
			},
			{
				name: "PERMISSION_MANAGEMENT", icon: mdiCards, route: PERMISSION_MANAGEMENT, label: "Permissions et rôles" 
			},
			{
				name: "DRIVER_LIST", icon: mdiCardAccountDetails, route: DRIVER_LIST, label: "Liste des conducteurs" 
			},
			{
				name: "DRIVER_ADD", icon: mdiPlus, route: DRIVER_ADD, label: "Ajouter un conducteur" 
			},
			{
				name: "INCIDENT_HISTORY", icon: mdiHistory, route: INCIDENT_HISTORY, label: "Historique des incidents" 
			}
		]
	},
	{
		title: "Gestions des essais",
		value: "trials",
		items: [
			{
				name: "TRY_MOTORCYCLE_LIST", icon: mdiMotorbike, route: TRY_MOTORCYCLE_LIST, label: "Motos en essai" 
			},
			{
				name: "TRY_HISTORY", icon: mdiHistory, route: TRY_HISTORY, label: "Historique des essais" 
			},
			{
				name: "TROUBLESHOOTING_ADD", icon: mdiAlert, route: TROUBLESHOOTING_ADD, label: "Signaler un incident" 
			}
		]
	}
];

export default adminNavSections;
