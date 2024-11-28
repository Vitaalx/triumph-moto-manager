<script setup lang="ts">
import ButtonPrimary from '@/components/ButtonPrimary.vue'
import SocialLinks from './SocialLinks.vue';
</script>

<template>
    <div class="lg:relative lg:z-30 flex items-center gap-6 md:gap-12">
        <SocialLinks orientation="vertical" />

        <div
            class="w-full lg:max-w-112 p-4 md:p-8 flex flex-col gap-4 items-start text-white bg-black/20"
        >
            <h1 class="text-3xl md:text-5xl font-bold">
                Optimisez la gestion de votre flotte
            </h1>

            <p class="text-xl md:text-2xl text-muted">
                Suivez et entretenez vos motos facilement grâce à notre plateforme innovante.
            </p>

            <ButtonPrimary size="lg" class="mt-8">Découvrir</ButtonPrimary>
        </div>
    </div>
</template>
