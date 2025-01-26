<script setup lang="ts">
interface Props {
	title: string
	backTo?: string
}

defineProps<Props>();
</script>

<template>
	<section>
		<div class="mb-6 flex flex-col gap-2">
			<h1 class="text-2xl font-semibold">
				{{ title }}
			</h1>

			<RouterLink
				v-if="backTo"
				:to="{ name: backTo }"
				class="text-primary hover:underline"
			>
				&lt; Retour
			</RouterLink>
		</div>
		
		<div class="w-full p-6 flex flex-col gap-10">
			<slot />
		</div>
	</section>
</template>
