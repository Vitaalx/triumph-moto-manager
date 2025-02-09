<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import ButtonPrimary from "./ButtonPrimary.vue";
import AccountDropdown from "@/domains/user/components/AccountDropdown.vue";
import TheMobileNav from "./TheMobileNav.vue";

const { HOME_PAGE, ABOUTE_PAGE, /* MOTORCYCLE_TESTS_PAGE, */ CONNECTION_PAGE } = routerPageName;

const userStore = useUserStore();
</script>

<template>
	<header class="sticky z-50 top-0 w-full bg-white">
		<div class="container h-28 flex justify-between items-center">
			<div class="flex gap-8">
				<TheMobileNav />

				<RouterLink
					:to="{ name: HOME_PAGE }"
					class="text-2xl text-primary font-bold"
				>
					TRIUMPH MOTO SPORT
				</RouterLink>
			</div>


			<div class="flex gap-24 items-center">
				<nav class="hidden lg:block">
					<ul class="flex gap-8">
						<li>
							<RouterLink :to="{ name: HOME_PAGE }">
								Accueil
							</RouterLink>
						</li>

						<li>
							<RouterLink :to="{ name: ABOUTE_PAGE }">
								A propos
							</RouterLink>
						</li>

						<!-- <li v-if="userStore.isConnected">
							<RouterLink :to="{ name: MOTORCYCLE_TESTS_PAGE }">
								Essais moto
							</RouterLink>
						</li> -->

						<!-- <li>
							<RouterLink :to="{ name: '' }">
								Contact
							</RouterLink>
						</li> -->
					</ul>
				</nav>

				<ButtonPrimary
					v-if="!userStore.isConnected"
					as-child
				>
					<RouterLink :to="{ name: CONNECTION_PAGE }">
						Connexion | Inscription
					</RouterLink>
				</ButtonPrimary>

				<AccountDropdown v-else />
			</div>
		</div>
	</header>
</template>
