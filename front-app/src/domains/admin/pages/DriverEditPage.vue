<script setup lang="ts">
import { useRouteParams } from "@/composables/useRouteParams";
import { routerPageName } from "@/router/routerPageName";
import { z } from "zod";
import { useMotorcycleGetAll } from "../composables/useMotorcycleGetAll";
import { useDriverEdit } from "../composables/useDriverEdit";
import { computed, ref } from "vue";
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
const { DRIVER_LIST } = routerPageName;

const { isLoading: isMotorcyclesLoading, motorcycles } = useMotorcycleGetAll();
const { isLoaded: isDriverLoaded, driver, onSubmit, addMotorcycle } = useDriverEdit(params.value.driverId);

const notPossessedMotorcycles = computed(() => {
	if (!motorcycles.value || !motorcycles.value.length) return [];

	return motorcycles.value
		.filter(motorcycle => !driver.value?.motorcycles
			.some(m => m.licensePlate.value === motorcycle.licensePlate));
});

const selectedMotorcycle = ref("");

function handleAddMotorcycle() {
	if (!selectedMotorcycle.value) return;

	addMotorcycle(selectedMotorcycle.value);
}
</script>

<template>
	<AdminSection
		title="Modifier le conducteur"
		:back-to="DRIVER_LIST"
	>
		<div v-if="!isDriverLoaded || isMotorcyclesLoading">
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

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<TheSelect v-model="selectedMotorcycle">
				<SelectTrigger>
					<SelectValue placeholder="Sélectionner une moto" />
				</SelectTrigger>

				<SelectContent>
					<SelectGroup>
						<SelectItem
							v-for="motorcycle in notPossessedMotorcycles"
							:key="motorcycle.licensePlate"
							:value="motorcycle.licensePlate"
						>
							{{ motorcycle.licensePlate }} ({{ motorcycle.brand }} - {{ motorcycle.model }})
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</TheSelect>
		</div>

		<div class="flex justify-start">
			<ButtonPrimary @click="handleAddMotorcycle">
				Ajouter la moto au pilote
			</ButtonPrimary>
		</div>
	</AdminSection>
</template>
  
