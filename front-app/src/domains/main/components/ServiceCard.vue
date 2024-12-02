<script setup lang="ts">
import { TheCard, CardContent } from '@/components/ui/card';
import TheIcon from '@/components/TheIcon.vue';

interface ServiceCard {
    icon: string
    title: string
    description: string
}

defineProps<ServiceCard>()
</script>

<template>
    <TheCard class="w-60 h-64 lg:w-72 lg:h-80">
        <CardContent class="w-full h-full p-6 flex flex-col gap-4 justify-center items-center text-center">
            <TheIcon :icon="icon" class="text-primary" />

            <h3 class="text-lg md:text-xl font-medium">{{ title }}</h3>

            <p class="text-black/75">{{ description }}</p>
        </CardContent>
    </TheCard>
</template>
