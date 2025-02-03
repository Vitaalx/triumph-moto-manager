<script setup lang="ts">
import { useRouteParams } from "@/composables/useRouteParams";
import { z } from "zod";
import { routerPageName } from "@/router/routerPageName";
import { useMaintenanceGet } from "../composables/useMaintenanceGet";
import { computed } from "vue";
import { DateFormatter } from "@internationalized/date";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import AdminSection from "../components/AdminSection.vue";

const params = useRouteParams({
	maintenanceId: z.string(),
});

const { MAINTENANCE_CURRENT_LIST } = routerPageName;
const { maintenance, isLoading } = useMaintenanceGet(params.value.maintenanceId);

const dateFormatter = new DateFormatter("fr-FR", {
	dateStyle: "long",
});

const formattedDate = computed(() =>
	maintenance.value.date ? dateFormatter.format(new Date(maintenance.value.date)) : undefined
);

const formattedPartsCost = computed(() =>
	new Intl.NumberFormat("fr-FR", {
		style: "currency",
		currency: "EUR",
	}).format(maintenance.value.totalSparePartsCost)
);

const formattedLaborPrice = computed(() =>
	new Intl.NumberFormat("fr-FR", {
		style: "currency",
		currency: "EUR",
	}).format(maintenance.value.laborPrice)
);

const formattedTotalCost = computed(() =>
	new Intl.NumberFormat("fr-FR", {
		style: "currency",
		currency: "EUR",
	}).format(maintenance.value.totalCost)
);
</script>

<template>
	<AdminSection
		title="Devis d'entretien"
		:back-to="MAINTENANCE_CURRENT_LIST"
	>
		<div
			v-if="isLoading"
			class="flex justify-center items-center h-40"
		>
			<p>Chargement des données...</p>
		</div>

		<div
			v-else
			class="space-y-6"
		>
			<div class="space-x-4">
				<ButtonPrimary>
					Envoyer par mail
				</ButtonPrimary>

				<ButtonPrimary
					v-if="maintenance.status !== 'closed'"
					variant="destructive"
				>
					Cloturer l'entretien
				</ButtonPrimary>
			</div>

			<div
				class="bg-white p-8 rounded-lg shadow-lg border border-gray-200"
			>
				<div class="flex justify-between items-center mb-6 border-b pb-4">
					<div>
						<h2 class="text-2xl font-bold text-gray-900">
							Devis d'Entretien
						</h2>

						<p class="text-sm text-gray-600">
							Référence : #{{ maintenance.id }}
						</p>

						<p class="text-sm text-gray-600">
							Date : {{ formattedDate }}
						</p>
					</div>

					<div class="flex gap-2 items-center">
						<p class="text-gray-700 font-semibold">
							Status :
						</p>

						<span
							class="px-3 py-1 rounded-full text-white"
							:class="{
								'bg-blue-500': maintenance.status === 'À venir',
								'bg-yellow-500': maintenance.status === 'En cours',
								'bg-red-500': maintenance.status === 'Cloturé',
							}"
						>
							{{ maintenance.status }}
						</span>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
					<div>
						<h3 class="text-lg font-semibold text-gray-900 mb-2">
							Informations du conducteur
						</h3>

						<p class="text-gray-700">
							<span class="font-medium">ID Conducteur :</span> {{ maintenance.driverId }}
						</p>
					</div>

					<div>
						<h3 class="text-lg font-semibold text-gray-900 mb-2">
							Informations Moto
						</h3>

						<p class="text-gray-700">
							<span class="font-medium">Plaque :</span> {{ maintenance.motorcycleId }}
						</p>
					</div>
				</div>

				<div class="mb-6">
					<h3 class="text-lg font-semibold text-gray-900 mb-2">
						Recommandations techniques
					</h3>

					<p class="text-gray-700 bg-gray-100 p-4 rounded">
						{{ maintenance.technicalRecommendations || "Aucune recommandation spécifique." }}
					</p>
				</div>

				<div class="mb-6">
					<h3 class="text-lg font-semibold text-gray-900 mb-2">
						Pièces remplacées
					</h3>

					<div v-if="maintenance.usedSpareParts.length > 0">
						<table class="w-full border-collapse border border-gray-300">
							<thead class="bg-gray-200">
								<tr>
									<th class="border border-gray-300 px-4 py-2 text-left">
										ID de la pièce
									</th>

									<th class="border border-gray-300 px-4 py-2 text-left">
										Quantité
									</th>
								</tr>
							</thead>

							<tbody>
								<tr
									v-for="part in maintenance.usedSpareParts"
									:key="part.id"
									class="border-b border-gray-300"
								>
									<td class="border border-gray-300 px-4 py-2 font-mono">
										{{ part.id }}
									</td>

									<td class="border border-gray-300 px-4 py-2">
										{{ part.quantity }}
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<p
						v-else
						class="text-gray-500"
					>
						Aucune pièce remplacée.
					</p>
				</div>

				<div class="border-t pt-4">
					<h3 class="text-lg font-semibold text-gray-900 mb-2">
						Résumé des coûts
					</h3>

					<div class="flex justify-between items-center text-gray-700">
						<span>Coût des pièces :</span>

						<span class="font-medium">{{ formattedPartsCost }}</span>
					</div>

					<div class="flex justify-between items-center text-gray-700">
						<span>Coût de la main œuvre :</span>

						<span class="font-medium">{{ formattedLaborPrice }}</span>
					</div>

					<div class="flex justify-between items-center text-gray-700">
						<strong>Coût total :</strong>

						<span class="text-lg font-bold text-gray-900">{{ formattedTotalCost }}</span>
					</div>
				</div>
			</div>
		</div>
	</AdminSection>
</template>
