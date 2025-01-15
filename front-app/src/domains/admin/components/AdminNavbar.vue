<script setup lang="ts">
import { useRoute } from "vue-router";
import { routerPageName } from "@/router/routerPageName";
import { computed } from "vue";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TheAccordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import TheIcon from "@/components/TheIcon.vue";
import {
	mdiHome,
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

const {
	DASHBOARD,
	MOTORBIKE_LIST,
	MOTORBIKE_ADD,
	MAINTENANCE_PLANNING,
	MAINTENANCE_HISTORY
} = routerPageName;
const route = useRoute();

const defaultOpenAccordion = computed(() => {
	const routeName = route.name?.toString() || "";

	if (routeName === MOTORBIKE_LIST || routeName === MOTORBIKE_ADD) return "fleet";
	if (routeName === MAINTENANCE_PLANNING || routeName === MAINTENANCE_HISTORY) return "maintenance";

	return "";
});
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
					<RouterLink
						:to="{ name: DASHBOARD }"
						class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
						:class="
							route.name === DASHBOARD
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
							value="fleet"
						>
							<AccordionTrigger class="h-10 px-3 py-2 text-muted-foreground rounded-lg hover:no-underline data-[state=open]:bg-muted">
								Gestion de flotte
							</AccordionTrigger>

							<AccordionContent class="py-2">
								<ul class="ml-2 flex flex-col gap-2">
									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: MOTORBIKE_LIST }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
											:class="
												route.name === MOTORBIKE_LIST
													? 'bg-muted text-primary'
													: 'text-muted-foreground'
											"
										>
											<TheIcon :icon="mdiMotorbike" />
											Liste des motos
										</RouterLink>
									</li>

									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: MOTORBIKE_ADD }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
											:class="
												route.name === MOTORBIKE_ADD
													? 'bg-muted text-primary'
													: 'text-muted-foreground'
											"
										>
											<TheIcon :icon="mdiPlus" />
											Ajouter une moto
										</RouterLink>
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							class="border-b-0"
							value="maintenance"
						>
							<AccordionTrigger class="h-10 px-3 py-2 text-muted-foreground rounded-lg hover:no-underline data-[state=open]:bg-muted">
								Gestion des entretiens
							</AccordionTrigger>

							<AccordionContent class="py-2">
								<ul class="ml-2 flex flex-col gap-2">
									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: MAINTENANCE_PLANNING }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
											:class="
												route.name === MAINTENANCE_PLANNING
													? 'bg-muted text-primary'
													: 'text-muted-foreground'
											"
										>
											<TheIcon :icon="mdiCalendarClock" />
											Planification des entretiens
										</RouterLink>
									</li>

									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: MAINTENANCE_HISTORY }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
											:class="
												route.name === MAINTENANCE_HISTORY
													? 'bg-muted text-primary'
													: 'text-muted-foreground'
											"
										>
											<TheIcon :icon="mdiHistory" />
											Historique des entretiens
										</RouterLink>
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							class="border-b-0"
							value="Stock"
						>
							<AccordionTrigger class="h-10 px-3 py-2 text-muted-foreground rounded-lg hover:no-underline data-[state=open]:bg-muted">
								Gestion des stocks
							</AccordionTrigger>

							<AccordionContent class="py-2">
								<ul class="ml-2 flex flex-col gap-2">
									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
										>
											<TheIcon :icon="mdiFormatListBulleted" />
											Liste des pièces détachées
										</RouterLink>
									</li>

									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
										>
											<TheIcon :icon="mdiPlus" />
											Ajouter une pièce
										</RouterLink>
									</li>

									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
										>
											<TheIcon :icon="mdiHistory" />
											Historique des commandes
										</RouterLink>
									</li>

									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
										>
											<TheIcon :icon="mdiAccountHardHat" />
											Liste des fournisseurs
										</RouterLink>
									</li>

									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
										>
											<TheIcon :icon="mdiPlus" />
											Ajouter un fournisseur
										</RouterLink>
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							class="border-b-0"
							value="Utilisateurs"
						>
							<AccordionTrigger class="h-10 px-3 py-2 text-muted-foreground rounded-lg hover:no-underline data-[state=open]:bg-muted">
								Gestions des utilisateurs
							</AccordionTrigger>

							<AccordionContent class="py-2">
								<ul class="ml-2 flex flex-col gap-2">
									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
										>
											<TheIcon :icon="mdiAccountGroup" />
											Liste des utilisateurs
										</RouterLink>
									</li>

									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
										>
											<TheIcon :icon="mdiAccountPlus" />
											Ajouter un utilisateur
										</RouterLink>
									</li>

									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
										>
											<TheIcon :icon="mdiCards" />
											Permissions et rôles
										</RouterLink>
									</li>

									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
										>
											<TheIcon :icon="mdiCardAccountDetails" />
											Liste des conducteurs
										</RouterLink>
									</li>

									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
										>
											<TheIcon :icon="mdiPlus" />
											Ajouter un conducteur
										</RouterLink>
									</li>

									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
										>
											<TheIcon :icon="mdiHistory" />
											Historique des incidents
										</RouterLink>
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							class="border-b-0"
							value="Essais"
						>
							<AccordionTrigger class="h-10 px-3 py-2 text-muted-foreground rounded-lg hover:no-underline data-[state=open]:bg-muted">
								Gestions des essais
							</AccordionTrigger>

							<AccordionContent class="py-2">
								<ul class="ml-2 flex flex-col gap-2">
									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
										>
											<TheIcon :icon="mdiMotorbike" />
											Motos en essai
										</RouterLink>
									</li>

									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
										>
											<TheIcon :icon="mdiHistory" />
											Historique des essais
										</RouterLink>
									</li>

									<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
										<RouterLink
											:to="{ name: '' }"
											class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
										>
											<TheIcon :icon="mdiAlert" />
											Signaler un incident
										</RouterLink>
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

