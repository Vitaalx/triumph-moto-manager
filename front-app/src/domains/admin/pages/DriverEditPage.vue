<script setup lang="ts">
import { useRouteParams } from "@/composables/useRouteParams";
import { z } from "zod";
import { useDriverEdit } from "../composables/useDriverEdit";
import AdminSection from "../components/AdminSection.vue";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import TheInput from "@/components/ui/input/TheInput.vue";
import {
	TheSelect,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import ButtonPrimary from "@/components/ButtonPrimary.vue";

const params = useRouteParams({
	driverId: z.string(),
});

const { isLoaded, onSubmit } = useDriverEdit(params.value.driverId);
</script>

<template>
	<AdminSection title="Modifier le conducteur">
		<div v-if="!isLoaded">
			Chargement des données...
		</div>

		<form
			v-else
			@submit="onSubmit"
			class="space-y-6"
		>
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
								placeholder="mail@exemple.com"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
  
				<FormField
					v-slot="{ componentField }"
					name="age"
				>
					<FormItem>
						<FormLabel>Age</FormLabel>

						<FormControl>
							<TheInput
								type="number"
								placeholder="16"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
			</div>
  
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField
					v-slot="{ componentField }"
					name="motorcycleLicenseType"
				>
					<FormItem>
						<FormLabel>Permis</FormLabel>

						<!-- <FormControl>
							<TheInput
								type="text"
								placeholder="A"
								v-bind="componentField"
							/>
						</FormControl> -->

						<TheSelect v-bind="componentField">
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Sélectionner un type de permis" />
								</SelectTrigger>
							</FormControl>

							<SelectContent>
								<SelectGroup>
									<SelectItem value="A1">
										A1
									</SelectItem>

									<SelectItem value="A2">
										A2
									</SelectItem>

									<SelectItem value="A">
										A
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</TheSelect>

						<FormMessage />
					</FormItem>
				</FormField>
  
				<FormField
					v-slot="{ componentField }"
					name="drivingExperience"
				>
					<FormItem>
						<FormLabel>Experience</FormLabel>

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
			</div>
  
			<div class="flex justify-end">
				<ButtonPrimary type="submit">
					Modifier
				</ButtonPrimary>
			</div>
		</form>
	</AdminSection>
</template>
  
