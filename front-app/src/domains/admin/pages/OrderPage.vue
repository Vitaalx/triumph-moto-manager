<script setup lang="ts">
import { useRouteParams } from "@/composables/useRouteParams";
import { z } from "zod";
import { routerPageName } from "@/router/routerPageName";
import { useOrderGet } from "../composables/useOrderGet";
import { DateFormatter } from "@internationalized/date";
import { computed } from "vue";
import AdminSection from "../components/AdminSection.vue";
import { formatPrice } from "@/lib/utils";

const params = useRouteParams({
	orderId: z.string(),
});

const { ORDER_CURRENT_LIST } = routerPageName;
const { order, isLoading } = useOrderGet(params.value.orderId);

const dateFormatter = new DateFormatter("fr-FR", {
	dateStyle: "long",
});

const formattedDate = computed(() =>
	order.value.createDate ? dateFormatter.format(new Date(order.value.createDate)) : undefined
);

const formattedStatus = computed(() => {
	if (order.value.status === "IN_DELIVERY") {
		return "En cours de livraison";
	}

	if (order.value.status === "DELIVERED") {
		return "Livré";
	}

	return order.value.status;
});
</script>

<template>
	<AdminSection
		title="Détail de la commande"
		:back-to="ORDER_CURRENT_LIST"
	>
		<div
			v-if="isLoading"
			class="flex justify-center items-center h-40"
		>
			<p>Chargement des données...</p>
		</div>

		<div
			v-else
			class="bg-white p-8 rounded-lg shadow-lg border border-gray-200"
		>
			<div class="flex justify-between items-center mb-6 border-b pb-4">
				<div>
					<h2 class="text-2xl font-bold text-gray-900">
						Commande #{{ order.id }}
					</h2>

					<p class="text-sm text-gray-600">
						Fournisseur : {{ order.supplierName }}
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
							'bg-yellow-500': order.status === 'IN_DELIVERY',
							'bg-green-500': order.status === 'DELIVERED',
						}"
					>
						{{ formattedStatus }}
					</span>
				</div>
			</div>

			<div class="mb-6">
				<h3 class="text-lg font-semibold text-gray-900 mb-2">
					Informations du fournisseur
				</h3>

				<p class="text-gray-700 bg-gray-100 p-4 rounded">
					{{ order.supplierName }}
				</p>
			</div>

			<div class="mb-6">
				<h3 class="text-lg font-semibold text-gray-900 mb-2">
					Pièces commandées
				</h3>

				<div v-if="order.parts.length > 0">
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
							<tr
								v-for="part in order.parts"
								:key="part.sparePartId"
								class="border-b border-gray-300"
							>
								<td class="border border-gray-300 px-4 py-2 font-mono">
									{{ part.sparePart.name }}
								</td>

								<td class="border border-gray-300 px-4 py-2 font-mono">
									{{ part.sparePart.brand }}
								</td>

								<td class="border border-gray-300 px-4 py-2 text-center font-semibold">
									{{ part.quantity }}
								</td>

								<td class="border border-gray-300 px-4 py-2">
									{{ formatPrice(part.sparePart.price * part.quantity) }} ({{ formatPrice(part.sparePart.price) }} / unité)
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<p
					v-else
					class="text-gray-500"
				>
					Aucune pièce commandée.
				</p>
			</div>

			<div class="border-t pt-4">
				<div class="flex justify-between items-center text-gray-700">
					<strong>Coût total :</strong>

					<span class="text-lg font-bold text-gray-900">{{ formatPrice(order.totalPrice) }}</span>
				</div>
			</div>
		</div>
	</AdminSection>
</template>
