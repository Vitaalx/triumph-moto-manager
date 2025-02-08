<script setup lang="ts">
import { useRouteParams } from "@/composables/useRouteParams";
import { z } from "zod";
import { routerPageName } from "@/router/routerPageName";
import { useSparePartGetAll } from "../composables/useSparePartGetAll";
import { useOrderEdit } from "../composables/useOrderEdit";
import { computed } from "vue";
import type { formattedSparePart } from "@/schemas/sparePartSchema";
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
	orderId: z.string(),
});

const { ORDER_CURRENT_LIST } = routerPageName;

const { isLoading: isSparePartsLoading, spareParts } = useSparePartGetAll();
const { isLoaded, onSubmit, values, setFieldValue, setDelivered } = useOrderEdit(params.value.orderId);

const usedSparePartsWithDetails = computed(() => {
	if (!values.parts) return [];

	return values.parts
		.map((part) => {
			const sparePart = spareParts.value.find(p => p.id === part.sparePartId);
			return sparePart ? { ...sparePart, quantity: part.quantity } : undefined;
		})
		.filter((part): part is formattedSparePart & { quantity: number } => part !== undefined && part.quantity > 0);
});

function updateSparePartQuantity(id: string, quantity: number) {
	if (!values.parts) return;

	const updatedParts = values.parts.map(part =>
		part.sparePartId === id ? { ...part, quantity: quantity } : part
	);

	setFieldValue("parts", updatedParts);
}

function removeSparePart(id: string) {
	if (!values.parts) return;

	const updatedParts = values.parts.map(part =>
		part.sparePartId === id ? { ...part, quantity: 0 } : part
	);

	setFieldValue("parts", updatedParts);
}
</script>

<template>
	<AdminSection
		title="Modifier la commande"
		:back-to="ORDER_CURRENT_LIST"
	>
		<div v-if="!isLoaded && isSparePartsLoading">
			Chargement des données...
		</div>

		<div
			v-if="isLoaded"
			class="space-y-6"
		>
			<ButtonPrimary
				@click="setDelivered"
				variant="destructive"
			>
				Marquer comme livré
			</ButtonPrimary>

			<form
				@submit="onSubmit"
				class="space-y-6"
			>
				<FormField
					v-slot="{ componentField }"
					name="supplierName"
				>
					<FormItem>
						<FormLabel>Fournisseur</FormLabel>

						<FormControl>
							<TheInput
								type="text"
								placeholder="Chronopost"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>

				<FormField name="parts">
					<FormItem>
						<FormLabel>Pièces</FormLabel>

						<FormControl>
							<div
								v-for="part in usedSparePartsWithDetails"
								:key="part.id"
								class="flex items-center justify-between border px-3 py-2 rounded-md mb-4 bg-white"
							>
								<div class="flex gap-4 items-center">
									<span class="text-sm font-semibold">{{ part.name }} - {{ part.brand }}</span>

									<span class="text-sm text-gray-600">{{ part.price }} €/unité</span>
								</div>

								<div class="flex items-center gap-4">
									<TheInput
										type="number"
										v-model.number="part.quantity"
										@input="updateSparePartQuantity(part.id, part.quantity)"
										class="w-20 border rounded-md px-2 py-1"
										:min="1"
									/>

									<ButtonPrimary
										@click="removeSparePart(part.id)"
										variant="destructive"
										class="ml-2"
									>
										Supprimer
									</ButtonPrimary>
								</div>
							</div>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
  
				<div class="flex justify-end">
					<ButtonPrimary type="submit">
						Modifier l'entretien
					</ButtonPrimary>
				</div>
			</form>
		</div>
	</AdminSection>
</template>
