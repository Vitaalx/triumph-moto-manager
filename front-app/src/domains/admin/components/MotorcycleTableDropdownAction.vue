<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
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
import { useMotorcycleDelete } from "../composables/useMotorcycleDelete";

const { MOTORCYCLE_EDIT } = routerPageName;

interface Props {
	licensePlate: string
}

defineProps<Props>();

const emit = defineEmits<(e: "expand") => void>();

const isExpanded = ref(false);
const { deleteMotorcycle } = useMotorcycleDelete();

function copy(licensePlate: string) {
	navigator.clipboard.writeText(licensePlate);
}

function toggleExpand() {
	isExpanded.value = !isExpanded.value;
	emit("expand");
}

function handleDeleteMotorcycle(licensePlate: string) {
	deleteMotorcycle(licensePlate);
	window.location.reload();
}
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
				@click="copy(licensePlate)"
				class="cursor-pointer"
			>
				Copier l'ID
			</DropdownMenuItem>

			<DropdownMenuItem
				@click="toggleExpand"
				class="cursor-pointer"
			>
				{{ isExpanded ? "Réduire" : "Développer" }}
			</DropdownMenuItem>

			<DropdownMenuItem>
				<RouterLink
					:to="{ name: MOTORCYCLE_EDIT, params: { licensePlate } }"
					class="cursor-pointer"
				>
					Modifier
				</RouterLink>
			</DropdownMenuItem>

			<DropdownMenuSeparator />

			<DropdownMenuItem 
				class="cursor-pointer bg-red-600 text-white hover:bg-red-500"
				@click="handleDeleteMotorcycle(licensePlate)"
			>
				Supprimer
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
