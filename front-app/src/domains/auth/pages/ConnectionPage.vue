<script setup lang="ts">
import { useAuth } from "../composables/useAuth";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import TheInput from "@/components/ui/input/TheInput.vue";

const { login } = useAuth();

const formSchema = toTypedSchema(
	z.object({
		email: z
			.string({ message: "L'email est obligatoire." })
			.email({ message: "L'email doit être valide." }),
		password: z
			.string({ message: "Le mot de passe est obligatoire." })
			.min(5, { message: "Le mot de passe doit contenir au moins 5 caractères." }),
	})
);

const { handleSubmit } = useForm({
	validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
	login(values);
});
</script>

<template>
	<section class="h-screen-nh lg:p-0 flex justify-center items-center">
		<div class="w-full h-full flex justify-center items-center lg:grid lg:items-stretch lg:justify-normal lg:grid-cols-2">
			<div class="flex justify-center items-center py-12">
				<div class="mx-auto grid w-96 gap-6">
					<div class="grid gap-2 text-center">
						<h1 class="text-3xl font-bold">
							Connexion
						</h1>

						<p class="text-balance text-muted-foreground">
							Connectez-vous à votre compte
						</p>
					</div>

					<form
						@submit="onSubmit" 
						class="grid gap-4"
					>
						<FormField
							v-slot="{ componentField }"
							name="email"
						>
							<FormItem>
								<FormLabel>Email</FormLabel>

								<FormControl>
									<TheInput
										type="email"
										placeholder="mail@exemple.com"
										v-bind="componentField"
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						</FormField>

						<FormField
							v-slot="{ componentField }"
							name="password"
						>
							<FormItem>
								<FormLabel>Mot de passe</FormLabel>

								<FormControl>
									<TheInput
										type="password"
										v-bind="componentField"
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						</FormField>

						<ButtonPrimary type="submit">
							Se connecter
						</ButtonPrimary>
					</form>
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