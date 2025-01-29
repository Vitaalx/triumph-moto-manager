<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import { useDriverGetAll } from "../composables/useDriverGetAll";
import { useMotorcycleGetAll } from "../composables/useMotorcycleGetAll";
import { useMotorcycleTrialIncidentAdd } from "../composables/useMotorcycleTrialIncidentAdd";
import AdminSection from "../components/AdminSection.vue";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	TheSelect,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { TheInput } from "@/components/ui/input";
import ButtonPrimary from "@/components/ButtonPrimary.vue";

const { INCIDENT_HISTORY } = routerPageName;
const { drivers, isLoading: isDriversLoading } = useDriverGetAll();
const { motorcycles, isLoading: isMotorcyclesLoading } = useMotorcycleGetAll();
const { onSubmit } = useMotorcycleTrialIncidentAdd();
</script>

<template>
	<AdminSection
		title="Signaler un incident"
		:back-to="INCIDENT_HISTORY"
	>
		<div v-if="isDriversLoading || isMotorcyclesLoading">
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
					name="driverId"
				>
					<FormItem>
						<FormLabel>Pilote</FormLabel>

						<TheSelect v-bind="componentField">
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Sélectionner un pilote" />
								</SelectTrigger>
							</FormControl>

							<SelectContent>
								<SelectGroup>
									<SelectItem
										v-for="driver in drivers"
										:key="driver.id"
										:value="driver.id"
									>
										{{ driver.fullName }}
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</TheSelect>

						<FormMessage />
					</FormItem>
				</FormField>

				<FormField
					v-slot="{ componentField }"
					name="motorcycleId"
				>
					<FormItem>
						<FormLabel>Moto</FormLabel>

						<TheSelect v-bind="componentField">
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Sélectionner une moto" />
								</SelectTrigger>
							</FormControl>

							<SelectContent>
								<SelectGroup>
									<SelectItem
										v-for="motorcycle in motorcycles"
										:key="motorcycle.licensePlate"
										:value="motorcycle.licensePlate"
									>
										{{ motorcycle.brand }} - {{ motorcycle.model }}
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</TheSelect>

						<FormMessage />
					</FormItem>
				</FormField>
			</div>
  
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField
					v-slot="{ componentField }"
					name="description"
				>
					<FormItem>
						<FormLabel>Description</FormLabel>

						<FormControl>
							<TheInput
								type="texterea"
								placeholder="Description de l'incident"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
			</div>
  
			<div class="flex justify-end">
				<ButtonPrimary type="submit">
					Ajouter l'incident
				</ButtonPrimary>
			</div>
		</form>
	</AdminSection>
</template>
