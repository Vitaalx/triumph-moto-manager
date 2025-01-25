<script setup lang="ts">
import { useDriverAdd } from "../composables/useDriverAdd";
import AdminSection from "../components/AdminSection.vue";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { TheInput } from "@/components/ui/input";
import ButtonPrimary from "@/components/ButtonPrimary.vue";

const { onSubmit } = useDriverAdd();
</script>

<template>
	<AdminSection title="Ajouter un conducteur">
		<form
			@submit="onSubmit"
			class="space-y-6"
		>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField
					v-slot="{ componentField }"
					name="name"
				>
					<FormItem>
						<FormLabel>Nom</FormLabel>

						<FormControl>
							<TheInput
								type="text"
								placeholder="Obo"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
  
				<FormField
					v-slot="{ componentField }"
					name="firstname"
				>
					<FormItem>
						<FormLabel>Prénom</FormLabel>

						<FormControl>
							<TheInput
								type="text"
								placeholder="Bob"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
			</div>
  
			<FormField
				v-slot="{ componentField }"
				name="age"
			>
				<FormItem>
					<FormLabel>Age</FormLabel>

					<FormControl>
						<TheInput
							type="number"
							placeholder="28"
							v-bind="componentField"
						/>
					</FormControl>

					<FormMessage />
				</FormItem>
			</FormField>
  
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField
					v-slot="{ componentField }"
					name="email"
				>
					<FormItem>
						<FormLabel>Email</FormLabel>

						<FormControl>
							<TheInput
								type="email"
								placeholder="bobo@gmail.com"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
  
				<FormField
					v-slot="{ componentField }"
					name="motorcycleLicenseType"
				>
					<FormItem>
						<FormLabel>Type de permis</FormLabel>

						<FormControl>
							<TheInput
								type="text"
								placeholder="A"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
			</div>
  
			<FormField
				v-slot="{ componentField }"
				name="drivingExperience"
			>
				<FormItem>
					<FormLabel>Expérience de conduite</FormLabel>

					<FormControl>
						<TheInput
							type="text"
							placeholder="1 an"
							v-bind="componentField"
						/>
					</FormControl>

					<FormMessage />
				</FormItem>
			</FormField>
  
			<div class="flex justify-end">
				<ButtonPrimary type="submit">
					Ajouter
				</ButtonPrimary>
			</div>
		</form>
	</AdminSection>
</template>

