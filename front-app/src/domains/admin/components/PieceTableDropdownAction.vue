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
import { ref } from "vue";

interface Props {
	id: string
}

defineProps<Props>();

const emit = defineEmits<(e: "expand") => void>();
const isExpanded = ref(false);

function copy(id: string) {
	navigator.clipboard.writeText(id);
}

function toggleExpand() {
	isExpanded.value = !isExpanded.value;
	emit("expand");
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
				@click="toggleExpand"
				class="cursor-pointer"
			>
				{{ isExpanded ? "Réduire" : "Développer" }}
			</DropdownMenuItem>

			<DropdownMenuSeparator />

			<DropdownMenuItem>Voir le fournisseur</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
