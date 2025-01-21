import { routerPageNameMain } from "@/domains/main/router";
import { routerPageNameAdminPanel } from "@/domains/admin/router";


export const routerPageName = Object.freeze({
	...routerPageNameMain,
	...routerPageNameAdminPanel,
});
