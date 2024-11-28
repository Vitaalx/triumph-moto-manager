<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { mdiAccountOutline } from '@mdi/js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ButtonSecondary from '@/components/ButtonSecondary.vue';
import TheIcon from '@/components/TheIcon.vue';

const userStore = useUserStore();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
        <ButtonSecondary
            size="icon"
            class="rounded-full"
        >
            <TheIcon
                :path="mdiAccountOutline"
                size="32"
            />
		</ButtonSecondary>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Mon compte</DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuItem>
        <RouterLink :to="{ name: '' }">
          Mon profil
        </RouterLink>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem @click="userStore.logout">
        <span class="cursor-pointer">Se déconnecter</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
