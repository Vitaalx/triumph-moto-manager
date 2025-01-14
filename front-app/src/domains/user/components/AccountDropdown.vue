<script setup lang="ts">
import { useAuth } from "@/domains/auth/composables/useAuth";
import { mdiAccountOutline } from "@mdi/js";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ButtonSecondary from "@/components/ButtonSecondary.vue";
import TheIcon from "@/components/TheIcon.vue";

const { logout } = useAuth();
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger>
			<ButtonSecondary
				size="icon"
				class="rounded-full"
			>
				<TheIcon :icon="mdiAccountOutline" />
			</ButtonSecondary>
		</DropdownMenuTrigger>

		<DropdownMenuContent align="end">
			<DropdownMenuLabel>Mon compte</DropdownMenuLabel>

			<DropdownMenuSeparator />

			<DropdownMenuItem>
				<RouterLink :to="{ name: '' }">
					Mon profil
				</RouterLink>
			</DropdownMenuItem>

			<DropdownMenuSeparator />

			<DropdownMenuItem>
				<RouterLink :to="{ name: 'admin-panel' }">
					Administration 
				</RouterLink>
			</DropdownMenuItem>

			<DropdownMenuSeparator />

			<DropdownMenuItem @click="logout">
				<span class="cursor-pointer">Se déconnecter</span>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
