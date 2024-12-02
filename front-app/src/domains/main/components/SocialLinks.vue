<script setup lang="ts">
import { ref } from 'vue';
import TheIcon from '@/components/TheIcon.vue'
import { mdiFacebook, mdiInstagram, mdiTwitter, mdiWhatsapp, mdiYoutube } from '@mdi/js';

interface Social {
    orientation: 'horizontal' | 'vertical'
}

defineProps<Social>()

const socials = ref([
    {
        icon: mdiFacebook,
        link: 'https://www.facebook.com'
    },
    {
        icon: mdiInstagram,
        link: 'https://www.instagram.com'
    },
    {
        icon: mdiTwitter,
        link: 'https://www.twitter.com'
    },
    {
        icon: mdiWhatsapp,
        link: 'https://www.whatsapp.com'
    },
    {
        icon: mdiYoutube,
        link: 'https://www.youtube.com'
    }
]);
</script>

<template>
    <nav>
        <ul class="flex justify-center gap-4 text-primary" :class="[orientation === 'horizontal' ? 'flex-row' : 'flex-col']">
            <li v-for="(social, index) in socials" :key="index">
                <a :href="social.link" target="_blank" rel="noopener noreferrer">
                    <TheIcon :icon="social.icon" class="text-primary" />
                </a>
            </li>
        </ul>
    </nav>
</template>
