<script setup lang="ts">
// import { routerPageName } from "@/router/routerPageName";
import { TheButton } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-vue-next";
import { ref } from "vue";
// import { useDriverDelete } from "../composables/useDriverDelete";

// const { DRIVER_EDIT } = routerPageName;

interface Props {
	driverId: string
	email: string
}

defineProps<Props>();

const emit = defineEmits<(e: "expand") => void>();

const isExpanded = ref(false);
// const { deleteDriver } = useDriverDelete();

function copy(email: string) {
	navigator.clipboard.writeText(email);
}

function toggleExpand() {
	isExpanded.value = !isExpanded.value;
	emit("expand");
}

// function handleDeleteMotorcycle(driverId: string) {
// 	deleteDriver(driverId);
// 	window.location.reload();
// }
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<TheButton
				variant="ghost"
				class="h-8 w-8 p-0"
			>
				<span class="sr-only">Ouvir le menu</span>

				<MoreHorizontal class="h-4 w-4" />
			</TheButton>
		</DropdownMenuTrigger>

		<DropdownMenuContent align="end">
			<DropdownMenuLabel>Actions</DropdownMenuLabel>

			<DropdownMenuItem
				@click="copy(email)"
				class="cursor-pointer"
			>
				Copier l'email
			</DropdownMenuItem>

			<DropdownMenuItem
				@click="toggleExpand"
				class="cursor-pointer"
			>
				{{ isExpanded ? "Réduire" : "Développer" }}
			</DropdownMenuItem>

			<!-- <DropdownMenuItem>
				<RouterLink
					:to="{ name: DRIVER_EDIT, params: { driverId } }"
					class="cursor-pointer"
				>
					Modifier
				</RouterLink>
			</DropdownMenuItem> -->

			<DropdownMenuSeparator />

			<!-- <DropdownMenuItem 
				class="cursor-pointer bg-red-600 text-white hover:bg-red-500"
				@click="handleDeleteMotorcycle(driverId)"
			>
				Supprimer
			</DropdownMenuItem> -->
		</DropdownMenuContent>
	</DropdownMenu>
</template>
