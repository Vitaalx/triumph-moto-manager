<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import TheSeparator from './ui/separator/TheSeparator.vue';
import TheIcon from './TheIcon.vue';
import { mdiFacebook, mdiTwitter, mdiInstagram } from '@mdi/js';

const currentYear = computed(() => new Date().getFullYear());

const socials = ref([
    {
        icon: mdiFacebook,
        link: 'https://www.facebook.com'
    },
    {
        icon: mdiTwitter,
        link: 'https://www.twitter.com'
    },
    {
        icon: mdiInstagram,
        link: 'https://www.instagram.com'
    }
]);
</script>

<template>
    <footer class="p-4 md:p-8 bg-carbon text-center">
        <span class="text-white opacity-75">
            &copy; 2024-{{ currentYear }} Triumph Moto Sport. Tous droits réservés.
        </span>

        <TheSeparator class="my-4 md:my-8" />

        <div class="container flex flex-col-reverse md:flex-row gap-4 justify-between items-center">
            <RouterLink :to="{ name: 'home' }" class="text-2xl text-primary font-bold">
                TRIUMPH MOTO SPORT
            </RouterLink>

            <div class="flex gap-4">
                <a v-for="(social, index) in socials" :key="index" :href="social.link" target="_blank" rel="noopener noreferrer">
                    <TheIcon :path="social.icon" size="24" class="text-primary" />
                </a>
            </div>
        </div>
    </footer>
</template>
