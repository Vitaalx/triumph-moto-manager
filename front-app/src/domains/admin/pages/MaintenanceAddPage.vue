<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import { useDriverGetAll } from "../composables/useDriverGetAll";
import { useMotorcycleGetAll } from "../composables/useMotorcycleGetAll";
import { useMaintenanceAdd } from "../composables/useMaintenanceAdd";
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
import ButtonPrimary from "@/components/ButtonPrimary.vue";

const { MAINTENANCE_CURRENT_LIST } = routerPageName;

const { drivers, isLoading: isDriversLoading } = useDriverGetAll();
const { motorcycles, isLoading: isMotorcyclesLoading } = useMotorcycleGetAll();
const { onSubmit } = useMaintenanceAdd();
</script>

<template>
	<AdminSection 
		title="Ajouter un entretien"
		:back-to="MAINTENANCE_CURRENT_LIST"
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
										{{ driver.fullName }} ({{ driver.email }})
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
										{{ motorcycle.licensePlate }} ({{ motorcycle.brand }} - {{ motorcycle.model }})
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</TheSelect>

						<FormMessage />
					</FormItem>
				</FormField>
			</div>
  
			<div class="flex justify-end">
				<ButtonPrimary type="submit">
					Créer l'entretien
				</ButtonPrimary>
			</div>
		</form>
	</AdminSection>
</template>
