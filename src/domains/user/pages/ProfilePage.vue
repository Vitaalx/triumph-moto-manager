<script setup lang="ts">
import { ref } from 'vue';
import { mdiAccountOutline } from '@mdi/js';
import { useUserStore } from '@/stores/userStore';
import TheIcon from '@/components/TheIcon.vue';
import TheLabel from '@/components/ui/label/TheLabel.vue';
import TheInput from '@/components/ui/input/TheInput.vue';
import ButtonSecondary from '@/components/ButtonSecondary.vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';

const userStore = useUserStore();
const user = userStore.user;
const isEditing = ref(false);

function updateProfil() {
    console.log(user);
    isEditing.value = false;
}
</script>

<template>
    <section class="h-screen-nh container my-14 flex flex-col gap-12 items-center">
        <h1
            class="text-xl md:text-2xl font-bold text-center relative after:content-[''] after:block after:h-0.5 after:bg-primary after:mt-3"
        >
            Mon profil
        </h1>

        <div class="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <aside class="flex flex-col items-center gap-4 text-sm text-muted-foreground">
				<div class="flex items-center justify-center w-32 h-32 rounded-full bg-secondary">
					<TheIcon
						:path="mdiAccountOutline"
						size="64"
					/>
				</div>

				<div class="text-center">
					{{ user.firstName }} {{ user.lastName }}
				</div>
			</aside>

            <div class="grid gap-6 md:grid-cols-2">
                <div class="grid gap-2">
                    <TheLabel for="firstName">Prénom</TheLabel>
                    <TheInput
                        id="firstName"
                        type="text"
                        :disabled="!isEditing"
                        v-model="user.firstName"
                    />
                </div>

                <div class="grid gap-2">
                    <TheLabel for="lastName">Nom</TheLabel>
                    <TheInput
                        id="lastName"
                        type="text"
                        :disabled="!isEditing"
                        v-model="user.lastName"
                    />
                </div>

                <div class="grid gap-2">
                    <TheLabel for="email">Email</TheLabel>
                    <TheInput
                        id="email"
                        type="email"
                        :disabled="!isEditing"
                        v-model="user.email"
                    />
                </div>

                <div class="grid gap-2">
                    <TheLabel for="phone">Téléphone</TheLabel>
                    <TheInput
                        id="phone"
                        type="tel"
                        :disabled="!isEditing"
                        v-model="user.phone"
                    />
                </div>

                <ButtonSecondary
                    class="w-full col-span-full"
                    @click="isEditing = !isEditing"
                >
                    {{ isEditing ? 'Annuler' : 'Modifier' }}
                </ButtonSecondary>

                <ButtonPrimary
                    class="w-full col-span-full"
                    v-if="isEditing"
                    @click="updateProfil"
                >
                    Enregistrer
                </ButtonPrimary>
            </div>
        </div>
    </section>
</template>
