<script setup lang="ts">
import { useRouteParams } from "@/composables/useRouteParams";
import { z } from "zod";
import { routerPageName } from "@/router/routerPageName";
import { useSparePartGetAll } from "../composables/useSparePartGetAll";
import { DateFormatter, parseDate, type DateValue } from "@internationalized/date";
import { useMaintenanceEdit } from "../composables/useMaintenanceEdit";
import { computed, ref, watch } from "vue";
import type { Piece } from "@/schemas/pieceSchema";
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
import { TheCalendar } from "@/components/ui/calendar";
import { ThePopover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@lib/utils";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { toDate } from "radix-vue/date";

const params = useRouteParams({
	maintenanceId: z.string(),
});
const { MAINTENANCE_CURRENT_LIST } = routerPageName;

const { sparePartes, isLoading: isSparePartes } = useSparePartGetAll();
const { isLoaded, onSubmit, values, setFieldValue } = useMaintenanceEdit(params.value.maintenanceId);

const df = new DateFormatter("fr-FR", {
	dateStyle: "long",
});
const datePlaceholder = ref<DateValue>();
const date = computed({
	get: () => values.date ? parseDate(values.date.split("T")[0]) : undefined,
	set: val => val,
});

const usedSparePartsWithDetails = computed(() => {
	if (!values.usedSpareParts) return [];

	return values.usedSpareParts
		.map((part) => {
			const piece = sparePartes.value.find(p => p.id === part.id);
			return piece ? { ...piece, quantity: part.quantity } : undefined;
		})
		.filter((part): part is Piece & { quantity: number } => part !== undefined);
});
const totalSparePartsCost = computed(() => {
	if (!values.usedSpareParts) return 0;

	return values.usedSpareParts.reduce((total, part) => {
		const piece = sparePartes.value.find(p => p.id === part.id);
		
		return piece ? total + piece.price * part.quantity : total;
	}, 0);
});
const totalCost = computed(() => {
	const laborPrice = values.laborPrice || 0;
	return totalSparePartsCost.value + laborPrice;
});


function addSparePart(pieceId: string) {
	if (!values.usedSpareParts) return;

	const pieceExists = values.usedSpareParts.find(part => part.id === pieceId);

	if (!pieceExists) {
		const newPart = { id: pieceId, quantity: 1 };
		setFieldValue("usedSpareParts", [...values.usedSpareParts, newPart]);
	}
}

function updateSparePartQuantity(id: string, quantity: number) {
	if (!values.usedSpareParts) return;

	const updatedParts = values.usedSpareParts.map(part => 
		part.id === id ? { ...part, quantity } : part
	);

	setFieldValue("usedSpareParts", updatedParts);
}

function removeSparePart(id: string) {
	if (!values.usedSpareParts) return;

	const updatedParts = values.usedSpareParts.filter(part => part.id !== id);

	setFieldValue("usedSpareParts", updatedParts);
}

watch(
	[totalSparePartsCost, () => values.laborPrice],
	([newTotalSparePartsCost, newLaborPrice]) => {
		const newTotal = newTotalSparePartsCost + (newLaborPrice || 0);
		setFieldValue("totalCost", newTotal);
	}
);
</script>

<template>
	<AdminSection 
		title="Modifier l'entretien"
		:back-to="MAINTENANCE_CURRENT_LIST"
	>
		<div v-if="!isLoaded && isSparePartes">
			Chargement des données...
		</div>

		<div 
			v-else
			class="space-y-6"
		>
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
											v-for="availablePiece in sparePartes"
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
										min="1"
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
						name="totalSparePartsCost"
					>
						<FormItem>
							<FormLabel>Coût des pièces</FormLabel>

							<FormControl>
								<TheInput
									type="number"
									:readonly="true"
									:value="totalSparePartsCost"
									class="bg-gray-100 cursor-not-allowed"
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					</FormField>


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

				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField name="totalCost">
						<FormItem>
							<FormLabel>Coût total de l'entretien</FormLabel>

							<FormControl>
								<TheInput
									type="number"
									:readonly="true"
									:value="totalCost"
									class="bg-gray-100 cursor-not-allowed"
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					</FormField>


					<FormField name="date">
						<FormItem class="flex flex-col justify-around">
							<FormLabel>Date de l'entretien</FormLabel>

							<ThePopover>
								<PopoverTrigger as-child>
									<FormControl>
										<ButtonPrimary
											variant="outline"
											:class="cn(
												'ps-3 text-start font-normal',
												!date && 'text-muted-foreground',
											)"
										>
											<span>{{ date ? df.format(toDate(date)) : "Choisir une date" }}</span>

											<CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
										</ButtonPrimary>
									</FormControl>
								</PopoverTrigger>

								<PopoverContent class="w-auto p-0">
									<TheCalendar
										v-model:placeholder="datePlaceholder"
										v-model="date"
										calendar-label="Date de début"
										initial-focus
										@update:model-value="(v) => {
											if (v) {
												setFieldValue('date', v.toString())
											}
											else {
												setFieldValue('date', undefined)
											}
										}"
									/>
								</PopoverContent>
							</ThePopover>

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
