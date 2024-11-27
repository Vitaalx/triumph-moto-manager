<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'
import TheIcon from '@/components/TheIcon.vue'
import { mdiFacebook, mdiInstagram, mdiTwitter, mdiWhatsapp, mdiYoutube } from '@mdi/js'
</script>

<template>
    <div class="lg:relative lg:z-30 flex gap-6 md:gap-12">
        <nav class="flex">
            <ul class="flex flex-col justify-center gap-3 text-primary">
                <li>
                    <TheIcon :path="mdiFacebook" />
                </li>

                <li>
                    <TheIcon :path="mdiInstagram" />
                </li>

                <li>
                    <TheIcon :path="mdiTwitter" />
                </li>

                <li>
                    <TheIcon :path="mdiWhatsapp" />
                </li>

                <li>
                    <TheIcon :path="mdiYoutube" />
                </li>
            </ul>
        </nav>

        <div
            class="w-full lg:max-w-112 p-4 md:p-8 flex flex-col gap-4 items-start text-white bg-black/20"
        >
            <h1 class="text-3xl md:text-5xl font-bold">
                Optimisez la gestion de votre flotte
            </h1>

            <p class="text-xl md:text-2xl text-muted">
                Suivez et entretenez vos motos facilement grâce à notre plateforme innovante.
            </p>

            <PrimaryButton size="lg" class="mt-8">Découvrir</PrimaryButton>
        </div>
    </div>
</template>

<!-- lg: -->
<!--  -->

<!-- mobile -->
<!--  -->
