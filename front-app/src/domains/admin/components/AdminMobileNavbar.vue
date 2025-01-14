<script setup lang="ts">
import { useRoute } from "vue-router";
import { routerPageName } from "@/router/routerPageName";
import { TheSheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import TheButton from "@/components/ui/button/TheButton.vue";
import TheIcon from "@/components/TheIcon.vue";
import { mdiMenu } from "@mdi/js";

const { ADMIN_PANEL_HOME } = routerPageName;
const route = useRoute();
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
			class="flex flex-col"
		>
			<nav class="grid gap-2 text-lg font-medium">
				<SheetClose as-child>
					<RouterLink
						:to="{ name: ADMIN_PANEL_HOME }"
						class="mb-6 text-center text-2xl font-bold"
					>
						<span>Panneau d'administration</span>
					</RouterLink>
				</SheetClose>
				
				<SheetClose as-child>
					<RouterLink
						:to="{ name: ADMIN_PANEL_HOME }"
						class="mx-[-0.65rem] px-3 py-2 flex items-center gap-4 rounded-xl hover:text-foreground"
						:class="
							route.name === ADMIN_PANEL_HOME ?
								'bg-muted text-foreground'
								:
								'text-muted-foreground'
						"
					>
						<TheIcon
							icon="home-outline"
							size="2xl"
						/>
						Tableau de bord
					</RouterLink>
				</SheetClose>
			</nav>
		</SheetContent>
	</TheSheet>
</template>
