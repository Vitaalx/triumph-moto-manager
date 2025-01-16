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

		<div class="w-full p-6 flex flex-col gap-10">
			<slot />
		</div>
	</section>
</template>
