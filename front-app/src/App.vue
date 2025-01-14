<script setup lang="ts">
import { RouterView } from "vue-router";
import TheLoader from "@/components/TheLoader.vue";
</script>

<template>
	<RouterView />

	<TheLoader />
</template>

<style scoped></style>
