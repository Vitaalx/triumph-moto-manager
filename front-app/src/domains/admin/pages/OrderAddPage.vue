<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import { useSparePartGetAll } from "../composables/useSparePartGetAll";
import { useOrderAdd } from "../composables/useOrderAdd";
import AdminSection from "../components/AdminSection.vue";
import { computed } from "vue";
import type { formattedSparePart } from "@/schemas/sparePartSchema";
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

const { ORDER_CURRENT_LIST } = routerPageName;

const { isLoading, spareParts } = useSparePartGetAll();
const {  onSubmit, values, setFieldValue } = useOrderAdd();

const usedSparePartsWithDetails = computed(() => {
	if (!values.parts) return [];

	return values.parts
		.map((part) => {
			const sparePart = spareParts.value.find(p => p.id === part.sparePartId);
			return sparePart ? { ...sparePart, quantity: part.quantity } : undefined;
		})
		.filter((part): part is formattedSparePart & { quantity: number } => part !== undefined && part.quantity > 0);
});

function addSparePart(id: string) {
	if (!Array.isArray(values.parts)) {
		setFieldValue("parts", [{ sparePartId: id, quantity: 1 }]);
		return;
	}

	const updatedParts = values.parts.map(part => {
		if (part.sparePartId === id) {
			return { ...part, quantity: part.quantity + 1 };
		}
		return part;
	});

	const sparePartExists = values.parts.some(part => part.sparePartId === id);

	if (!sparePartExists) {
		updatedParts.push({ sparePartId: id, quantity: 1 });
	}

	setFieldValue("parts", updatedParts);
}

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
		title="Créer une commande"
		:back-to="ORDER_CURRENT_LIST"
	>
		<div v-if="isLoading">
			Chargement des données...
		</div>

		<form
			v-else
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

					<FormMessage />
				</FormItem>
			</FormField>
  
			<div class="flex justify-end">
				<ButtonPrimary type="submit">
					Modifier l'entretien
				</ButtonPrimary>
			</div>
		</form>
	</AdminSection>
</template>
