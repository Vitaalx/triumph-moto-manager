<script setup lang="ts">
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

interface Piece {
	id: string
}

defineProps<Piece>();
defineEmits<(e: "expand") => void>();

function copy(id: string) {
	navigator.clipboard.writeText(id);
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
				@click="copy(id)"
				class="cursor-pointer"
			>
				Copier l'ID
			</DropdownMenuItem>

			<DropdownMenuItem
				@click="$emit('expand')"
				class="cursor-pointer"
			>
				Développer
			</DropdownMenuItem>

			<DropdownMenuSeparator />

			<DropdownMenuItem>Voir le fournisseur</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
