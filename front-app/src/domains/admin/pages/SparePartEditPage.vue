<script setup lang="ts">
import { useRouteParams } from "@/composables/useRouteParams";
import { routerPageName } from "@/router/routerPageName";
import { z } from "zod";
import { useSparePartEdit } from "../composables/useSparePartEdit";
import AdminSection from "../components/AdminSection.vue";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import TheInput from "@/components/ui/input/TheInput.vue";
import ButtonPrimary from "@/components/ButtonPrimary.vue";

const params = useRouteParams({
	sparePartId: z.string(),
});
const { SPARE_PART_LIST } = routerPageName;
const { isLoaded, onSubmit } = useSparePartEdit(params.value.sparePartId);
</script>

<template>
	<AdminSection
		:title="`Modifier la pièce ${params.sparePartId}`"
		:back-to="SPARE_PART_LIST"
	>
		<div v-if="!isLoaded">
			Chargement des données...
		</div>

		<form
			v-else
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
							disabled
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
						<FormLabel>Nom</FormLabel>

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
				</formfield>
			</div>
  
			<div class="flex justify-end">
				<ButtonPrimary type="submit">
					Modifier
				</ButtonPrimary>
			</div>
		</form>
	</AdminSection>
</template>
  
