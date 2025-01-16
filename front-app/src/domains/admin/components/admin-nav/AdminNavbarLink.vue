<script setup lang="ts">
import TheIcon from "@/components/TheIcon.vue";

interface Props {
  to: string;
  icon?: string;
  active: boolean;
}

defineProps<Props>();
</script>

<template>
	<RouterLink
		:to="{ name: to }"
		class="px-3 py-2 flex items-center gap-3 rounded-lg transition-all hover:text-primary"
		:class="active ? 'bg-muted text-primary' : 'text-muted-foreground'"
	>
		<TheIcon
			v-if="icon"
			:icon="icon"
		/>

		<slot />
	</RouterLink>
</template>
