<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import TheSeparator from "./ui/separator/TheSeparator.vue";
import SocialLinks from "@/domains/main/components/SocialLinks.vue";

const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
	<footer class="p-4 md:p-8 bg-carbon text-center">
		<span class="text-muted">
			&copy; 2024-{{ currentYear }} Triumph Moto Sport. Tous droits réservés.
		</span>

		<TheSeparator class="my-4 md:my-8 bg-muted" />

		<div class="container flex flex-col-reverse md:flex-row gap-4 justify-between items-center">
			<RouterLink
				:to="{ name: 'home' }"
				class="text-2xl text-primary font-bold"
			>
				TRIUMPH MOTO SPORT
			</RouterLink>

			<SocialLinks orientation="horizontal" />
		</div>
	</footer>
</template>
