<script setup lang="ts">
import TheCard from "@/components/ui/card/TheCard.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardContent from "@/components/ui/card/CardContent.vue";

interface Motorcycle {
    image: string;
    name: string;
    description: string;
}

defineProps<Motorcycle>();
</script>

<template>
	<TheCard>
		<CardHeader>
			<img
				:src="image"
				alt="Motorcycle"
				class="w-full h-full object-cover"
			>
		</CardHeader>

		<CardContent>
			<h2 class="text-xl font-semibold">
				{{ name }}
			</h2>

			<p class="text-sm text-muted-foreground">
				{{ description }}
			</p>
		</CardContent>
	</TheCard>
</template>
