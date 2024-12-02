<script setup lang="ts">
import { ref } from 'vue';
import BlackAndWhiteBg from '@/components/BlackAndWhiteBg.vue';
import HeroTextBox from '../components/HeroTextBox.vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import ServiceCard from '../components/ServiceCard.vue';
import { mdiFaceAgent, mdiMedalOutline, mdiWrench } from '@mdi/js';

const services = ref([
    {
        icon: mdiFaceAgent,
        title: 'Service client 24/7',
        description: 'Support disponible 24/7 pour répondre à toutes vos questions.'
    },
    {
        icon: mdiMedalOutline,
        title: 'Assurance qualifiée',
        description: 'Couverture d\'assurance complète et adaptée à vos besoins.'
    },
    {
        icon: mdiWrench,
        title: 'Gestion proactive de la maintenance',
        description: 'Planifiez et suivez facilement les entretiens de votre flotte.'
    }
]);
</script>

<template>
    <section class="relative">
        <BlackAndWhiteBg axe="x" black-size="2/5" white-size="3/5" />

        <div class="container h-screen-nh max-h-224 flex justify-center items-center lg:pr-0 lg:-space-x-20">
            <HeroTextBox class="hidden lg:flex" />

            <div
                class="relative z-20 w-full p-4 max-w-224 h-136 flex justify-center items-center bg-[url('@/assets/images/hero-moto.jpg')] bg-cover bg-center lg:p-0"
            >
                <HeroTextBox class="flex lg:hidden" />
            </div>
        </div>
    </section>

    <section class="my-14">
        <div class="container max-w-320 flex flex-col gap-10 items-center">
            <h2
                class="text-xl md:text-2xl font-bold text-center relative after:content-[''] after:block after:h-0.5 after:bg-primary after:mt-3"
            >
                A propos de nous
            </h2>

            <div class="md:h-80 flex flex-col md:flex-row gap-8">
                <div class="md:flex-1">
                    <img
                        src="@/assets/images/about-us.jpg"
                        alt="About us"
                        class="w-full h-full object-cover"
                    />
                </div>

                <div class="flex-1 flex flex-col gap-4 justify-center items-start">
                    <p>
                        Chez Triumph Motorcycles, nous combinons innovation et performance pour
                        offrir des motos de haute qualité. Notre plateforme de gestion de flotte
                        permet aux entreprises de suivre et d’optimiser l’utilisation de leurs
                        motos, en se concentrant sur la maintenance et la gestion des pièces
                        détachées. Rejoignez-nous pour une gestion de flotte efficace et durable, et
                        découvrez comment nous pouvons transformer votre expérience de conduite.
                    </p>

                    <ButtonPrimary size="lg" as-child>
                        <RouterLink :to="{ name: 'about' }">En savoir plus</RouterLink>
                    </ButtonPrimary>
                </div>
            </div>
        </div>
    </section>

    <section class="relative bg-carbon md:bg-transparent">
        <BlackAndWhiteBg axe="y" black-size="2/3" white-size="1/3" class="hidden md:flex" />

        <div class="md:h-136 py-14 flex flex-col gap-10 justify-center items-center">
            <div class="max-w-112 flex flex-col gap-6 items-center text-center text-white">
                <h2
                class="text-xl md:text-2xl font-bold text-center relative after:content-[''] after:block after:h-0.5 after:bg-primary after:mt-3"
                >
                    Nos services premium
                </h2>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita harum numquam,
                    mollitia cumque, nesciunt.
                </p>
            </div>

            <div class="flex flex-col md:flex-row gap-4 lg:gap-8">
                <ServiceCard
                    v-for="(service, index) in services" :key="index"
                    :icon="service.icon"
                    :title="service.title"
                    :description="service.description"
                />
            </div>
        </div>
    </section>
</template>
