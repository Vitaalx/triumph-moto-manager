<script setup lang="ts">
import { RouterView } from "vue-router";
import TheLoader from "@/components/TheLoader.vue";
import TheToaster from "./components/ui/toast/TheToaster.vue";
</script>

<template>
	<TheToaster />

	<RouterView />

	<TheLoader />
</template>

<style scoped></style>
