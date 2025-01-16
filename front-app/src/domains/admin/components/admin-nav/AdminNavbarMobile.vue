<script setup lang="ts">
import { useRoute } from "vue-router";
import { routerPageName } from "@/router/routerPageName";
import { useDefaultOpenAccordion } from "@/composables/useDefaultOpenAccordion";
import { TheSheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { adminNavBarSections, AdminNavbarLink } from ".";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TheButton from "@/components/ui/button/TheButton.vue";
import TheIcon from "@/components/TheIcon.vue";
import { mdiMenu, mdiHome } from "@mdi/js";
import { TheAccordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { computed } from "vue";

const { DASHBOARD } = routerPageName;
const route = useRoute();
const { defaultOpenAccordion } = useDefaultOpenAccordion();

const isActiveRoute = computed(() => (routeName: string) => route.name === routeName);
</script>

<template>
	<TheSheet>
		<SheetTrigger as-child>
			<TheButton
				variant="outline"
				size="icon"
				class="shrink-0 md:hidden"
			>
				<TheIcon :icon="mdiMenu" />
			</TheButton>
		</SheetTrigger>

		<SheetContent
			side="left"
			class="flex flex-col p-0"
		>
			<ScrollArea class="p-6">
				<nav class="grid gap-2 text-lg font-medium">
					<SheetClose as-child>
						<RouterLink
							:to="{ name: DASHBOARD }"
							class="mb-6 text-center text-2xl font-bold"
						>
							<span>Panneau d'administration</span>
						</RouterLink>
					</SheetClose>
                
					<SheetClose as-child>
						<AdminNavbarLink
							:to="DASHBOARD"
							:icon="mdiHome"
							:active="isActiveRoute(DASHBOARD)"
						>
							Tableau de bord
						</AdminNavbarLink>
					</SheetClose>

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
										<SheetClose as-child>
											<AdminNavbarLink
												:to="item.route"
												:icon="item.icon"
												:active="isActiveRoute(item.route)"
											>
												{{ item.label }}
											</AdminNavbarLink>
										</SheetClose>
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
					</TheAccordion>
				</nav>

				<ScrollBar orientation="vertical" />
			</ScrollArea>
		</SheetContent>
	</TheSheet>
</template>
