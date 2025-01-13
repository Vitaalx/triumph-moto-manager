<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import TheLabel from "@/components/ui/label/TheLabel.vue";
import TheInput from "@/components/ui/input/TheInput.vue";

const { login } = useAuth();

const isLoginForm = ref(true);
const email = ref("");
const password = ref("");

function handleLogin() {
	login(email.value, password.value);
}

function handleRegister() {
	console.log("register");
}
</script>

<template>
	<section class="h-screen-nh lg:p-0 flex justify-center items-center">
		<div class="w-full h-full flex justify-center items-center lg:grid lg:items-stretch lg:justify-normal lg:grid-cols-2">
			<div class="flex justify-center items-center py-12">
				<div class="mx-auto grid w-96 gap-6">
					<div class="grid gap-2 text-center">
						<h1 class="text-3xl font-bold">
							{{ isLoginForm ? 'Connexion' : 'Inscription' }}
						</h1>

						<p class="text-balance text-muted-foreground">
							{{ isLoginForm ? 'Connectez-vous à votre compte' : 'Créez un compte' }}
						</p>
					</div>

					<div class="grid gap-4">
						<div class="grid gap-2">
							<TheLabel for="email">
								Email
							</TheLabel>

							<TheInput
								id="email"
								type="email"
								v-model="email"
								placeholder="email@example.com"
								required
							/>
						</div>

						<div class="grid gap-2">
							<div class="flex items-center">
								<TheLabel for="password">
									Mot de passe
								</TheLabel>

								<RouterLink
									v-if="isLoginForm"
									to=""
									class="ml-auto inline-block text-sm underline"
								>
									Mot de passe oublié ?
								</RouterLink>
							</div>

							<TheInput
								id="password"
								type="password"
								v-model="password"
								required
							/>
						</div>

						<ButtonPrimary @click="isLoginForm ? handleLogin() : handleRegister()">
							{{ isLoginForm ? 'Se connecter' : "S'inscrire" }}
						</ButtonPrimary>
					</div>

					<div class="mt-4 text-center text-sm">
						{{ isLoginForm ? 'Pas encore de compte ?' : 'Déjà inscrit ?' }}
						<span
							class="text-balance cursor-pointer underline"
							@click="isLoginForm = !isLoginForm"
						>
							{{ isLoginForm ? 'Inscrivez-vous' : 'Connectez-vous' }}
						</span>
					</div>
				</div>
			</div>

			<div class="hidden bg-muted lg:block">
				<img
					src="@/assets/images/login.jpeg"
					alt="connection"
					class="object-cover w-full h-full"
				>
			</div>
		</div>
	</section>
</template>
