<script setup lang="ts">
import type { RouteLocationAsRelativeGeneric } from "vue-router";
import { ref } from "vue";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { TheButton } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-vue-next";

interface Props {
  copyText?: string;
  item: string;
  onExpand?: () => void;
  viewPath?: RouteLocationAsRelativeGeneric;
  editPath?: RouteLocationAsRelativeGeneric;
  onDelete?: (id: string) => void;
}

const props = defineProps<Props>();
const emit = defineEmits<(e: "copy", text: string) => void>();
const isExpanded = ref(false);

function copy() {
	if (props.copyText) {
		navigator.clipboard.writeText(props.item);
		emit("copy", props.item);
	}
}

function handleExpand() {
	if (props.onExpand) {
		isExpanded.value = !isExpanded.value;
		props.onExpand();
	}
}

function handleDelete() {
	if (props.onDelete) {
		props.onDelete(props.item);
	}
}
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<TheButton
				variant="ghost"
				class="h-8 w-8 p-0"
			>
				<span class="sr-only">Ouvrir le menu</span>

				<MoreHorizontal class="h-4 w-4" />
			</TheButton>
		</DropdownMenuTrigger>

		<DropdownMenuContent align="end">
			<DropdownMenuLabel>Actions</DropdownMenuLabel>

			<DropdownMenuItem
				v-if="copyText"
				@click="copy"
				class="cursor-pointer"
			>
				{{ copyText }}
			</DropdownMenuItem>

			<DropdownMenuItem
				v-if="onExpand"
				@click="handleExpand"
				class="cursor-pointer"
			>
				{{ isExpanded ? "Réduire" : "Développer" }}
			</DropdownMenuItem>

			<DropdownMenuItem v-if="viewPath">
				<RouterLink
					:to="viewPath"
					class="cursor-pointer"
				>
					Voir
				</RouterLink>
			</DropdownMenuItem>

			<DropdownMenuItem v-if="editPath">
				<RouterLink
					:to="editPath"
					class="cursor-pointer"
				>
					Modifier
				</RouterLink>
			</DropdownMenuItem>

			<DropdownMenuSeparator v-if="onDelete !== undefined" />

			<DropdownMenuItem 
				v-if="onDelete !== undefined"
				class="cursor-pointer bg-red-600 text-white hover:bg-red-500"
				@click="handleDelete"
			>
				Supprimer
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
