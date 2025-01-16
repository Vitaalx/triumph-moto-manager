<script setup lang="ts">
import TheButton from "@/components/ui/button/TheButton.vue";
import AdminSection from "../components/AdminSection.vue";
import SearchInput from "@/components/SearchInput.vue";
</script>

<template>
	<AdminSection title="Liste des pièces">
		<div class="flex justify-between items-center">
			<SearchInput />

			<TheButton>Ajouter une pièce</TheButton>
		</div>
	</AdminSection>
</template>
