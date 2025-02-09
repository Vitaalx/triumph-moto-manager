import { routerPageNameMain } from "@/domains/main/router";
import { routerPageNameAuth } from "@/domains/auth/router";
import { routerPageNameAdminPanel } from "@/domains/admin/router";


export const routerPageName = Object.freeze({
	...routerPageNameMain,
	...routerPageNameAuth,
	...routerPageNameAdminPanel,
});
