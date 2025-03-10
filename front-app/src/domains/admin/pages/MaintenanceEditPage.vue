<script setup lang="ts">
import { useRouteParams } from "@/composables/useRouteParams";
import { z } from "zod";
import { routerPageName } from "@/router/routerPageName";
import { useSparePartGetAll } from "../composables/useSparePartGetAll";
import { useMaintenanceEdit } from "../composables/useMaintenanceEdit";
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
import { TheTextarea } from "@/components/ui/textarea";
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

const params = useRouteParams({
	maintenanceId: z.string(),
});
const { MAINTENANCE_CURRENT_LIST } = routerPageName;

const { isLoading: isSparePartsLoading, spareParts } = useSparePartGetAll();
const { isLoaded, onSubmit, values, setFieldValue, closeMaintenance } = useMaintenanceEdit(params.value.maintenanceId);

const usedSparePartsWithDetails = computed(() => {
	if (!values.usedSpareParts) return [];

	return values.usedSpareParts
		.map((part) => {
			const sparePart = spareParts.value.find(p => p.id === part.sparePartId);
			return sparePart ? { ...sparePart, quantity: part.quantity } : undefined;
		})
		.filter((part): part is formattedSparePart & { quantity: number } => part !== undefined && part.quantity > 0);
});

function addSparePart(sparePartId: string) {
	if (!values.usedSpareParts) return;

	const updatedParts = values.usedSpareParts.map(part => {
		if (part.sparePartId === sparePartId) {
			return { ...part, quantity: part.quantity + 1 };
		}
		return part;
	});

	const sparePartExists = values.usedSpareParts.some(part => part.sparePartId === sparePartId);

	if (!sparePartExists) {
		updatedParts.push({ sparePartId: sparePartId, quantity: 1 });
	}

	setFieldValue("usedSpareParts", updatedParts);
}

function updateSparePartQuantity(id: string, quantity: number) {
	if (!values.usedSpareParts) return;

	const updatedParts = values.usedSpareParts.map(part =>
		part.sparePartId === id ? { ...part, quantity: quantity } : part
	);

	setFieldValue("usedSpareParts", updatedParts);
}

function removeSparePart(id: string) {
	if (!values.usedSpareParts) return;

	const updatedParts = values.usedSpareParts.map(part =>
		part.sparePartId === id ? { ...part, quantity: 0 } : part
	);

	setFieldValue("usedSpareParts", updatedParts);
}
</script>

<template>
	<AdminSection 
		title="Modifier l'entretien"
		:back-to="MAINTENANCE_CURRENT_LIST"
	>
		<div v-if="!isLoaded && isSparePartsLoading">
			Chargement des données...
		</div>

		<div 
			v-else
			class="space-y-6"
		>
			<ButtonPrimary
				@click="closeMaintenance"
				variant="destructive"
			>
				Cloturer l'entretien
			</ButtonPrimary>

			<form
				@submit="onSubmit"
				class="space-y-6"
			>
				<FormField
					v-slot="{ componentField }"
					name="technicalRecommendations"
				>
					<FormItem>
						<FormLabel>Recommendation technique</FormLabel>

						<FormControl>
							<TheTextarea
								type="texterea"
								placeholder="Recommandations techniques"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>

				<FormField name="usedSpareParts">
					<FormItem>
						<FormLabel>Pièces utilisées</FormLabel>

						<FormControl>
							<TheSelect @update:model-value="addSparePart">
								<SelectTrigger>
									<SelectValue placeholder="Ajouter une pièce" />
								</SelectTrigger>

								<SelectContent>
									<SelectGroup>
										<SelectItem
											v-for="availablePiece in spareParts"
											:key="availablePiece.id"
											:value="availablePiece.id"
										>
											{{ availablePiece.name }} - {{ availablePiece.brand }} ({{ availablePiece.stock }})
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</TheSelect>

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
										:max="part.stock"
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
					</FormItem>
				</FormField>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						v-slot="{ componentField }"
						name="laborPrice"
					>
						<FormItem>
							<FormLabel>Coût de la main d'œuvre</FormLabel>

							<FormControl>
								<TheInput
									type="number"
									min="0"
									v-bind="componentField"
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					</FormField>
				</div>
  
				<div class="flex justify-end">
					<ButtonPrimary type="submit">
						Modifier l'entretien
					</ButtonPrimary>
				</div>
			</form>
		</div>
	</AdminSection>
</template>
