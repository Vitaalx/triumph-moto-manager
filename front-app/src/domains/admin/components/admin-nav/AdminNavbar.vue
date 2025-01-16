<script setup lang="ts">
import { useRoute } from "vue-router";
import { routerPageName } from "@/router/routerPageName";
import { useDefaultOpenAccordion } from "@/composables/useDefaultOpenAccordion";
import { adminNavBarSections, AdminNavbarLink } from ".";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TheAccordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { computed } from "vue";
import { mdiHome } from "@mdi/js";

const { DASHBOARD } = routerPageName;
const route = useRoute();
const { defaultOpenAccordion } = useDefaultOpenAccordion();

const isActiveRoute = computed(() => (routeName: string) => route.name === routeName);
</script>

<template>
	<div class="hidden border-r bg-muted/50 md:block">
		<div class="flex h-full max-h-screen flex-col">
			<div class="flex h-28 justify-center items-center border-b px-4 lg:px-6">
				<RouterLink
					:to="{ name: 'dashboard' }"
					class="flex items-center gap-2 text-center font-semibold"
				>
					<span>Panneau d'administration</span>
				</RouterLink>
			</div>

			<ScrollArea class="py-2 flex-1">
				<nav class="grid gap-2 items-start px-2 text-sm font-medium lg:px-4">
					<AdminNavbarLink
						:to="DASHBOARD"
						:icon="mdiHome"
						:active="isActiveRoute(DASHBOARD)"
					>
						Tableau de bord
					</AdminNavbarLink>

					<TheAccordion
						type="multiple"
						collapsible
						class="w-full rounded-lg transition-all"
						:default-value="[defaultOpenAccordion]"
					>
						<AccordionItem
							v-for="section in adminNavBarSections"
							:key="section.value"
							:value="section.value"
							class="border-b-0"
						>
							<AccordionTrigger class="h-10 px-3 py-2 text-muted-foreground rounded-lg hover:no-underline data-[state=open]:bg-muted">
								{{ section.title }}
							</AccordionTrigger>

							<AccordionContent class="py-2">
								<ul class="ml-2 flex flex-col gap-2">
									<li
										v-for="item in section.items"
										:key="item.route"
										class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground"
									>
										<AdminNavbarLink
											:to="item.route"
											:icon="item.icon"
											:active="isActiveRoute(item.route)"
										>
											{{ item.label }}
										</AdminNavbarLink>
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
					</TheAccordion>
				</nav>

				<ScrollBar orientation="vertical" />
			</ScrollArea>
		</div>
	</div>
</template>
