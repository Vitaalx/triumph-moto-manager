<script setup lang="ts">
import { TheInput } from "@/components/ui/input";
import { Search } from "lucide-vue-next";

interface Props {
	placeholder?: string;
}

defineProps<Props>();
</script>

<template>
	<div class="relative w-full max-w-sm items-center">
		<TheInput
			id="search"
			type="text"
			:placeholder="placeholder || 'Rechercher...'"
			class="pl-10"
		/>

		<span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
			<Search class="size-6 text-muted-foreground" />
		</span>
	</div>
</template>
