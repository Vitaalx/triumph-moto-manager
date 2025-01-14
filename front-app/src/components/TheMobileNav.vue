<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import { mdiMenu } from "@mdi/js";
import { TheSheet, SheetTrigger, SheetContent, SheetClose } from "./ui/sheet";
import TheIcon from "./TheIcon.vue";
import ButtonPrimary from "./ButtonPrimary.vue";

const userStore = useUserStore();
</script>

<template>
	<TheSheet>
		<SheetTrigger as-child>
			<ButtonPrimary
				variant="outline"
				size="icon"
				class="shrink-0 lg:hidden"
			>
				<TheIcon :icon="mdiMenu" />
			</ButtonPrimary>
		</SheetTrigger>

		<SheetContent
			side="left"
			class="w-full max-w-96 p-6 flex flex-col gap-8"
		>
			<SheetClose as-child>
				<RouterLink
					to="/"
					class="m-4 text-center text-2xl text-primary font-bold"
				>
					TRIUMPH MOTO SPORT
				</RouterLink>
			</SheetClose>

			<nav class="grid gap-4 text-lg font-medium">
				<SheetClose as-child>
					<RouterLink
						:to="{ name: 'home' }"
						class="flex items-center gap-4 rounded-xl px-3 py-2 hover:text-muted-foreground"
					>
						Accueil
					</RouterLink>
				</SheetClose>

				<SheetClose as-child>
					<RouterLink
						:to="{ name: 'about' }"
						class="flex items-center gap-4 rounded-xl px-3 py-2 hover:text-muted-foreground"
					>
						A propos
					</RouterLink>
				</SheetClose>

				<SheetClose
					v-if="userStore.isConnected"
					as-child
				>
					<RouterLink
						:to="{ name: 'motorcycle-tests' }"
						class="flex items-center gap-4 rounded-xl px-3 py-2 hover:text-muted-foreground"
					>
						Essais moto
					</RouterLink>
				</SheetClose>

				<SheetClose as-child>
					<RouterLink
						:to="{ name: 'home' }"
						class="flex items-center gap-4 rounded-xl px-3 py-2 hover:text-muted-foreground"
					>
						Contact
					</RouterLink>
				</SheetClose>
			</nav>
		</SheetContent>
	</TheSheet>
</template>
