<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import { useSparePartAdd } from "../composables/useSparePartAdd";
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

const { SPARE_PART_LIST } = routerPageName;
const { onSubmit } = useSparePartAdd();
</script>

<template>
	<AdminSection 
		title="Ajouter une pièce"
		:back-to="SPARE_PART_LIST"
	>
		<form
			@submit="onSubmit"
			class="space-y-6"
		>
			<FormField
				v-slot="{ componentField }"
				name="refNumber"
			>
				<FormItem>
					<FormLabel>Référence</FormLabel>

					<FormControl>
						<TheInput
							type="text"
							placeholder="123456"
							v-bind="componentField"
						/>
					</FormControl>

					<FormMessage />
				</FormItem>
			</FormField>

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
								placeholder="Michelin"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
  
				<FormField
					v-slot="{ componentField }"
					name="name"
				>
					<FormItem>
						<FormLabel>Nom de la pièce</FormLabel>

						<FormControl>
							<TheInput
								type="text"
								placeholder="Pneu avant"
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
					name="price"
				>
					<FormItem>
						<FormLabel>Prix (à l'unité)</FormLabel>

						<FormControl>
							<TheInput
								type="number"
								placeholder="100"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
  
				<FormField
					v-slot="{ componentField }"
					name="stock"
				>
					<FormItem>
						<FormLabel>Stock</FormLabel>

						<FormControl>
							<TheInput
								type="number"
								placeholder="10"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
			</div>
  
			<div class="flex justify-end">
				<ButtonPrimary type="submit">
					Ajouter
				</ButtonPrimary>
			</div>
		</form>
	</AdminSection>
</template>
  
