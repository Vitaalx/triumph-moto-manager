<script setup lang="ts">
import ButtonPrimary from "@/components/ButtonPrimary.vue";
</script>

<template>
	<section class="h-screen container py-28 flex flex-col items-center justify-center">
		<h1 class="text-3xl lg:text-5xl font-bold">
			404 - Page introuvable
		</h1>

		<p class="mt-4 text-base lg:text-lg font-medium text-muted-foreground">
			La page que vous recherchez n'existe pas.
		</p>

		<ButtonPrimary
			size="lg"
			class="mt-8 w-min"
		>
			<RouterLink :to="{ name: 'home' }">
				Retour à l'accueil
			</RouterLink>
		</ButtonPrimary>
	</section>
</template>
