<script setup lang="ts">
import { TheSheet, SheetTrigger, SheetContent, SheetClose } from './ui/sheet';
import TheIcon from './TheIcon.vue';
import { mdiMenu } from '@mdi/js';
import ButtonPrimary from './ButtonPrimary.vue';
</script>

<template>
	<TheSheet>
		<SheetTrigger as-child>
			<ButtonPrimary
				variant="outline"
				size="icon"
				class="shrink-0 lg:hidden"
			>
				<TheIcon :path="mdiMenu"/>
			</ButtonPrimary>
		</SheetTrigger>

		<SheetContent
			side="right"
			class="w-full max-w-96 p-6 flex flex-col gap-8"
		>
            <SheetClose as-child>
                <RouterLink
                    to="/"
                    class="m-4 text-center text-2xl text-primary font-bold"
                >
                    TRIUMPH MOTO SPORT
                </RouterLink>
            </SheetClose>

			<nav class="grid gap-4 text-lg font-medium">
				<SheetClose as-child>
                    <RouterLink
                        :to="{ name: 'home' }"
                        class="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                        Accueil
                    </RouterLink>
                </SheetClose>

                <SheetClose as-child>
                    <RouterLink
                        :to="{ name: 'about' }"
                        class="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                        A propos
                    </RouterLink>
                </SheetClose>

                <SheetClose as-child>
                    <RouterLink
                        :to="{ name: 'home' }"
                        class="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                        Nos motos
                    </RouterLink>
                </SheetClose>

                <SheetClose as-child>
                    <RouterLink
                        :to="{ name: 'home' }"
                        class="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                        Contact
                    </RouterLink>
                </SheetClose>

                <SheetClose as-child>
                    <ButtonPrimary as-child>
                        <RouterLink :to="{ name: 'connection' }">Connexion | Inscription</RouterLink>
                    </ButtonPrimary>
                </SheetClose>
			</nav>
		</SheetContent>
	</TheSheet>
</template>
