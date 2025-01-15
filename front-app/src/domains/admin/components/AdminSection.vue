<script setup lang="ts">
interface Props {
	title: string
}

defineProps<Props>();
</script>

<template>
	<section>
		<h1 class="mb-12 text-2xl font-semibold">
			{{ title }}
		</h1>

		<div class="flex flex-col items-center w-full gap-10 p-6">
			<slot />
		</div>
	</section>
</template>
