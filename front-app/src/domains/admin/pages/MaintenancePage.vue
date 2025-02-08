<script setup lang="ts">
import { useRouteParams } from "@/composables/useRouteParams";
import { z } from "zod";
import { routerPageName } from "@/router/routerPageName";
import { useMaintenanceGet } from "../composables/useMaintenanceGet";
import { DateFormatter } from "@internationalized/date";
import { computed } from "vue";
import { formatPrice } from "@/lib/utils";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import AdminSection from "../components/AdminSection.vue";

const params = useRouteParams({
	maintenanceId: z.string(),
});

const { MAINTENANCE_HISTORY } = routerPageName;
const { maintenance, isLoading } = useMaintenanceGet(params.value.maintenanceId);

const dateFormatter = new DateFormatter("fr-FR", {
	dateStyle: "long",
});

const formattedDate = computed(() =>
	maintenance.value.date ? dateFormatter.format(new Date(maintenance.value.date)) : undefined
);

const formattedStatus = computed(() => {
	if (maintenance.value.status === "IN_PROGRESS") {
		return "En cours";
	}

	if (maintenance.value.status === "CLOSED") {
		return "Cloturé";
	}

	return maintenance.value.status;
});

function sendMail() {
	console.log("Sending mail...");
}
</script>

<template>
	<AdminSection
		title="Devis d'entretien"
		:back-to="MAINTENANCE_HISTORY"
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
			<ButtonPrimary @click="sendMail">
				Envoyer par mail
			</ButtonPrimary>

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
								'bg-yellow-500': maintenance.status === 'IN_PROGRESS',
								'bg-red-500': maintenance.status === 'CLOSED',
							}"
						>
							{{ formattedStatus }}
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
										Pièce
									</th>

									<th class="border border-gray-300 px-4 py-2 text-left">
										Marque
									</th>

									<th class="border border-gray-300 px-4 py-2 text-left">
										Quantité
									</th>

									<th class="border border-gray-300 px-4 py-2 text-left">
										Prix
									</th>
								</tr>
							</thead>

							<tbody>
								<template
									v-for="part in maintenance.usedSpareParts"
									:key="part.sparePartId"
								>
									<tr
										v-if="part.quantity > 0"
										class="border-b border-gray-300"
									>
										<td class="border border-gray-300 px-4 py-2 font-mono">
											{{ part.sparePart.name }}
										</td>

										<td class="border border-gray-300 px-4 py-2 font-mono">
											{{ part.sparePart.brand }}
										</td>

										<td class="border border-gray-300 px-4 py-2">
											{{ part.quantity }}
										</td>

										<td class="border border-gray-300 px-4 py-2">
											{{ formatPrice(part.sparePart.price * part.quantity) }} ({{ formatPrice(part.sparePart.price) }} / unité)
										</td>
									</tr>
								</template>
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

						<span class="font-medium">{{ formatPrice(maintenance.totalSparePartsPrice) }}</span>
					</div>

					<div class="flex justify-between items-center text-gray-700">
						<span>Coût de la main œuvre :</span>

						<span class="font-medium">{{ formatPrice(maintenance.laborPrice) }}</span>
					</div>

					<div class="flex justify-between items-center text-gray-700">
						<strong>Coût total :</strong>

						<span class="text-lg font-bold text-gray-900">{{ formatPrice(maintenance.totalMaintenancePrice) }}</span>
					</div>
				</div>
			</div>
		</div>
	</AdminSection>
</template>
