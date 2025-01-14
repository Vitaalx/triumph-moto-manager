<script setup lang="ts">
import { useRoute } from "vue-router";
import { routerPageName } from "@/router/routerPageName";
import { computed } from "vue";
import { TheAccordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import TheIcon from "@/components/TheIcon.vue";
import { mdiHome, mdiWrenchCog, mdiScrewRoundTop, mdiPlus, mdiMotorbike, mdiSecurity } from "@mdi/js";

const { ADMIN_PANEL_HOME } = routerPageName;
const route = useRoute();

const defaultOpenAccordion = computed(() => {
	const routeName = route.name?.toString() || "";

	if (routeName.includes("maintenance")) return "Gestion des entretiens";
	if (routeName.includes("piece")) return "Gestion des pièces";
	if (routeName.includes("test")) return "Gestion des essais";

	return "";
});
</script>

<template>
	<div class="hidden border-r bg-muted/50 md:block">
		<div class="flex h-full max-h-screen flex-col gap-2">
			<div class="flex h-28 justify-center items-center border-b px-4 lg:px-6">
				<RouterLink
					:to="{ name: 'admin-panel' }"
					class="flex items-center gap-2 text-center font-semibold"
				>
					<span>Panneau d'administration</span>
				</RouterLink>
			</div>
  
			<div class="flex-1">
				<nav class="grid gap-2 items-start px-2 text-sm font-medium lg:px-4">
					<RouterLink
						:to="{ name: 'admin-panel' }"
						class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
						:class="
							route.name === ADMIN_PANEL_HOME
								? 'bg-muted text-primary'
								: 'text-muted-foreground'
						"
					>
						<TheIcon :icon="mdiHome" />
						Tableau de bord
					</RouterLink>
  
					<TheAccordion
						type="multiple"
						collapsible
						class="w-full rounded-lg transition-all"
						:default-value="[defaultOpenAccordion]"
					>
						<AccordionItem
							class="border-b-0"
							value="Gestion des entretiens"
						>
							<AccordionTrigger class="h-10 px-3 py-2 text-muted-foreground rounded-lg hover:no-underline data-[state=open]:bg-muted">
								Gestion des entretiens
							</AccordionTrigger>

							<AccordionContent class="py-2">
								<ul class="ml-2 flex flex-col gap-2">
									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
											:class="
												route.name === ''
													? 'bg-muted text-primary'
													: 'text-muted-foreground'
											"
										>
											<TheIcon :icon="mdiWrenchCog" />
											Liste des entretiens
										</RouterLink>
									</li>

									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
											:class="
												route.name === ''
													? 'bg-muted text-primary'
													: 'text-muted-foreground'
											"
										>
											<TheIcon :icon="mdiPlus" />
											Créer un entretien
										</RouterLink>
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
  
						<AccordionItem
							class="border-b-0"
							value="Gestion des pièces"
						>
							<AccordionTrigger class="h-10 px-3 py-2 text-muted-foreground rounded-lg hover:no-underline data-[state=open]:bg-muted">
								Gestion des pièces
							</AccordionTrigger>

							<AccordionContent class="py-2">
								<ul class="pl-2 flex flex-col gap-2">
									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
											:class="
												route.name === ''
													? 'bg-muted text-primary'
													: 'text-muted-foreground'
											"
										>
											<TheIcon :icon="mdiScrewRoundTop" />
											Liste des pièces
										</RouterLink>
									</li>

									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
											:class="
												route.name === ''
													? 'bg-muted text-primary'
													: 'text-muted-foreground'
											"
										>
											<TheIcon :icon="mdiPlus" />
											Ajouter une pièce
										</RouterLink>
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
  
						<AccordionItem
							class="border-b-0"
							value="Gestion des essais"
						>
							<AccordionTrigger class="h-10 px-3 py-2 text-muted-foreground rounded-lg hover:no-underline data-[state=open]:bg-muted">
								Gestion des essais
							</AccordionTrigger>

							<AccordionContent class="py-2">
								<ul class="pl-2 flex flex-col gap-2">
									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
											:class="
												route.name === ''
													? 'bg-muted text-primary'
													: 'text-muted-foreground'
											"
										>
											<TheIcon :icon="mdiMotorbike" />
											Liste des essais
										</RouterLink>
									</li>

									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
											:class="
												route.name === ''
													? 'bg-muted text-primary'
													: 'text-muted-foreground'
											"
										>
											<TheIcon :icon="mdiPlus" />
											Ajouter un essai
										</RouterLink>
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
					</TheAccordion>
  
					<RouterLink
						:to="{ name: '' }"
						class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
						:class="
							route.name === ''
								? 'bg-muted text-primary'
								: 'text-muted-foreground'
						"
					>
						<TheIcon :icon="mdiSecurity" />
						Administration
					</RouterLink>
				</nav>
			</div>
		</div>
	</div>
</template>

