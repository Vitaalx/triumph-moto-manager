<script setup lang="ts">
import api from "@/lib/axios";
import { useRouteParams } from "@/composables/useRouteParams";
import { z } from "zod";
import { toast } from "@/components/ui/toast";
import { useMotorcycleEdit } from "../composables/useMotorcycleEdit";
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

const params = useRouteParams({
	licensePlate: z.string(),
});

async function getMotocycle(licensePlate: string) {
	try {
		const response = await api.get(`/motorcycle/${licensePlate}`);

		return response.data;
	} catch (error) {
		toast({
			title: "Erreur inconnue",
			description: "Une erreur inattendue est survenue.",
			variant: "destructive",
		});
	}
}

const motorcycle = await getMotocycle(params.value.licensePlate);

const { onSubmit } = useMotorcycleEdit(motorcycle);
</script>

<template>
	<AdminSection title="Ajouter une moto">
		<form
			@submit="onSubmit"
			class="space-y-6"
		>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField
					v-slot="{ componentField }"
					name="brand"
				>
					<FormItem>
						<FormLabel>Marque</FormLabel>

						<FormControl>
							<TheInput
								type="text"
								placeholder="Yamaha"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
  
				<FormField
					v-slot="{ componentField }"
					name="model"
				>
					<FormItem>
						<FormLabel>Modèle</FormLabel>

						<FormControl>
							<TheInput
								type="text"
								placeholder="MT-07"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
			</div>
  
			<FormField
				v-slot="{ componentField }"
				name="licensePlate"
			>
				<FormItem>
					<FormLabel>Immatriculation</FormLabel>

					<FormControl>
						<TheInput
							type="text"
							placeholder="AA-123-BB"
							v-bind="componentField"
							disabled
						/>
					</FormControl>

					<FormMessage />
				</FormItem>
			</FormField>
  
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField
					v-slot="{ componentField }"
					name="year"
				>
					<FormItem>
						<FormLabel>Année</FormLabel>

						<FormControl>
							<TheInput
								type="number"
								placeholder="2020"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
  
				<FormField
					v-slot="{ componentField }"
					name="price"
				>
					<FormItem>
						<FormLabel>Prix</FormLabel>

						<FormControl>
							<TheInput
								type="number"
								placeholder="7500"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
			</div>
  
			<FormField
				v-slot="{ componentField }"
				name="maintenanceInterval"
			>
				<FormItem>
					<FormLabel>Intervalle de maintenance</FormLabel>

					<FormControl>
						<TheInput
							type="text"
							placeholder="6000 km"
							v-bind="componentField"
						/>
					</FormControl>

					<FormMessage />
				</FormItem>
			</FormField>
  
			<div class="flex justify-end">
				<ButtonPrimary type="submit">
					Modifier
				</ButtonPrimary>
			</div>
		</form>
	</AdminSection>
</template>
  
