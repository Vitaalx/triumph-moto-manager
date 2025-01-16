<script setup lang="ts">
import { useRoute } from "vue-router";
import { routerPageName } from "@/router/routerPageName";
import { computed } from "vue";
import { TheSheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TheAccordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import TheButton from "@/components/ui/button/TheButton.vue";
import TheIcon from "@/components/TheIcon.vue";
import {
	mdiMenu,
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
	TRY_MOTORBIKE_LIST,
	TRY_HISTORY,
	TROUBLESHOOTING_ADD
} = routerPageName;
const route = useRoute();

const defaultOpenAccordion = computed(() => {
	const routeName: string = route.name?.toString() || "";

	const routeCategoryMap: Record<string, string> = {
		[MOTORBIKE_LIST]: "fleet",
		[MOTORBIKE_ADD]: "fleet",
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
		[TRY_MOTORBIKE_LIST]: "Essais",
		[TRY_HISTORY]: "Essais",
		[TROUBLESHOOTING_ADD]: "Essais"
	};

	return routeCategoryMap[routeName] || "";
});
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
						<RouterLink
							:to="{ name: DASHBOARD }"
							class="mx-[-0.65rem] px-3 py-2 flex items-center gap-4 rounded-xl hover:text-foreground"
							:class="
								route.name === DASHBOARD ?
									'bg-muted text-foreground'
									:
									'text-muted-foreground'
							"
						>
							<TheIcon :icon="mdiHome" />
							Tableau de bord
						</RouterLink>
					</SheetClose>

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
									<SheetClose as-child>
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
									</SheetClose>

									<SheetClose as-child>
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
									</SheetClose>
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
									<SheetClose as-child>
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
									</SheetClose>

									<SheetClose as-child>
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
									</SheetClose>
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
									<SheetClose as-child>
										<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
											<RouterLink
												:to="{ name: PIECE_LIST }"
												class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
												:class="
													route.name === PIECE_LIST
														? 'bg-muted text-primary'
														: 'text-muted-foreground'
												"
											>
												<TheIcon :icon="mdiFormatListBulleted" />
												Liste des pièces détachées
											</RouterLink>
										</li>
									</SheetClose>

									<SheetClose as-child>
										<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
											<RouterLink
												:to="{ name: PIECE_ADD }"
												class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
												:class="
													route.name === PIECE_ADD
														? 'bg-muted text-primary'
														: 'text-muted-foreground'
												"
											>
												<TheIcon :icon="mdiPlus" />
												Ajouter une pièce
											</RouterLink>
										</li>
									</SheetClose>

									<SheetClose as-child>
										<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
											<RouterLink
												:to="{ name: PIECE_DELIVERY_HISTORY }"
												class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
												:class="
													route.name === PIECE_DELIVERY_HISTORY
														? 'bg-muted text-primary'
														: 'text-muted-foreground'
												"
											>
												<TheIcon :icon="mdiHistory" />
												Historique des commandes
											</RouterLink>
										</li>
									</SheetClose>

									<SheetClose as-child>
										<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
											<RouterLink
												:to="{ name: PIECE_SUPPLIER_LIST }"
												class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
												:class="
													route.name === PIECE_SUPPLIER_LIST
														? 'bg-muted text-primary'
														: 'text-muted-foreground'
												"
											>
												<TheIcon :icon="mdiAccountHardHat" />
												Liste des fournisseurs
											</RouterLink>
										</li>
									</SheetClose>

									<SheetClose as-child>
										<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
											<RouterLink
												:to="{ name: PIECE_SUPPLIER_ADD }"
												class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
												:class="
													route.name === PIECE_SUPPLIER_ADD
														? 'bg-muted text-primary'
														: 'text-muted-foreground'
												"
											>
												<TheIcon :icon="mdiPlus" />
												Ajouter un fournisseur
											</RouterLink>
										</li>
									</SheetClose>
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
									<SheetClose as-child>
										<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
											<RouterLink
												:to="{ name: USER_LIST }"
												class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
												:class="
													route.name === USER_LIST
														? 'bg-muted text-primary'
														: 'text-muted-foreground'
												"
											>
												<TheIcon :icon="mdiAccountGroup" />
												Liste des utilisateurs
											</RouterLink>
										</li>
									</SheetClose>

									<SheetClose as-child>
										<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
											<RouterLink
												:to="{ name: USER_ADD }"
												class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
												:class="
													route.name === USER_ADD
														? 'bg-muted text-primary'
														: 'text-muted-foreground'
												"
											>
												<TheIcon :icon="mdiAccountPlus" />
												Ajouter un utilisateur
											</RouterLink>
										</li>
									</SheetClose>

									<SheetClose as-child>
										<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
											<RouterLink
												:to="{ name: PERMISSION_MANAGEMENT }"
												class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
												:class="
													route.name === PERMISSION_MANAGEMENT
														? 'bg-muted text-primary'
														: 'text-muted-foreground'
												"
											>
												<TheIcon :icon="mdiCards" />
												Permissions et rôles
											</RouterLink>
										</li>
									</SheetClose>

									<SheetClose as-child>
										<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
											<RouterLink
												:to="{ name: DRIVER_LIST }"
												class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
												:class="
													route.name === DRIVER_LIST
														? 'bg-muted text-primary'
														: 'text-muted-foreground'
												"
											>
												<TheIcon :icon="mdiCardAccountDetails" />
												Liste des conducteurs
											</RouterLink>
										</li>
									</SheetClose>

									<SheetClose as-child>
										<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
											<RouterLink
												:to="{ name: DRIVER_ADD }"
												class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
												:class="
													route.name === DRIVER_ADD
														? 'bg-muted text-primary'
														: 'text-muted-foreground'
												"
											>
												<TheIcon :icon="mdiPlus" />
												Ajouter un conducteur
											</RouterLink>
										</li>
									</SheetClose>

									<SheetClose as-child>
										<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
											<RouterLink
												:to="{ name: INCIDENT_HISTORY }"
												class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
												:class="
													route.name === INCIDENT_HISTORY
														? 'bg-muted text-primary'
														: 'text-muted-foreground'
												"
											>
												<TheIcon :icon="mdiHistory" />
												Historique des incidents
											</RouterLink>
										</li>
									</SheetClose>
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
									<SheetClose as-child>
										<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
											<RouterLink
												:to="{ name: TRY_MOTORBIKE_LIST }"
												class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
												:class="
													route.name === TRY_MOTORBIKE_LIST
														? 'bg-muted text-primary'
														: 'text-muted-foreground'
												"
											>
												<TheIcon :icon="mdiMotorbike" />
												Motos en essai
											</RouterLink>
										</li>
									</SheetClose>

									<SheetClose as-child>
										<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
											<RouterLink
												:to="{ name: TRY_HISTORY }"
												class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
												:class="
													route.name === TRY_HISTORY
														? 'bg-muted text-primary'
														: 'text-muted-foreground'
												"
											>
												<TheIcon :icon="mdiHistory" />
												Historique des essais
											</RouterLink>
										</li>
									</SheetClose>

									<SheetClose as-child>
										<li class="rounded-md no-underline outline-none focus:shadow-md text-muted-foreground hover:text-foreground">
											<RouterLink
												:to="{ name: TROUBLESHOOTING_ADD }"
												class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
												:class="
													route.name === TROUBLESHOOTING_ADD
														? 'bg-muted text-primary'
														: 'text-muted-foreground'
												"
											>
												<TheIcon :icon="mdiAlert" />
												Ajouter un dépannage
											</RouterLink>
										</li>
									</SheetClose>
								</ul>
							</AccordionContent>
						</AccordionItem>
					</TheAccordion>
				</nav>

				<ScrollBar orientation="vertical" />
			</scrollarea>
		</SheetContent>
	</TheSheet>
</template>
