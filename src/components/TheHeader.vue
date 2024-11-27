<script setup lang="ts">
import { RouterLink } from 'vue-router';
import PrimaryButton from './PrimaryButton.vue';
import TheMobileNav from './TheMobileNav.vue';
</script>

<template>
    <header class="sticky z-50 top-0 w-full bg-white">
        <div class="container h-28 flex justify-between items-center">
            <RouterLink :to="{ name: 'home' }" class="text-2xl text-primary font-bold">
                TRIUMPH MOTO SPORT
            </RouterLink>

            <div class="hidden lg:flex gap-24 items-center">
                <nav>
                    <ul class="flex gap-8">
                        <li>
                            <RouterLink :to="{ name: 'home' }">
                                Accueil
                            </RouterLink>
                        </li>

                        <li>
                            <RouterLink :to="{ name: 'about' }">
                                A propos
                            </RouterLink>
                        </li>

                        <li>
                            <RouterLink :to="{ name: '' }">
                                Nos motos
                            </RouterLink>
                        </li>

                        <li>
                            <RouterLink :to="{ name: '' }">
                                Contact
                            </RouterLink>
                        </li>
                    </ul>
                </nav>

                <PrimaryButton as-child>
                    <RouterLink :to="{ name: 'connection' }">Connexion | Inscription</RouterLink>
                </PrimaryButton>
            </div>

            <TheMobileNav />
        </div>
    </header>
</template>
