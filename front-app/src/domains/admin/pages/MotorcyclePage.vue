<script setup lang="ts">
import { useRouteParams } from "@/composables/useRouteParams";
import { z } from "zod";
import { routerPageName } from "@/router/routerPageName";
import { useMotorcycleGet } from "../composables/useMotorcycleGet";
import AdminSection from "../components/AdminSection.vue";
import TheIcon from "@/components/TheIcon.vue";
import { mdiMotorbike } from "@mdi/js";

const params = useRouteParams({
	licensePlate: z.string(),
});
const { motorcycle } = useMotorcycleGet(params.value.licensePlate);
const { MOTORCYCLE_LIST } = routerPageName;
</script>

<template>
	<AdminSection
		:title="`Détail de la moto ${motorcycle.licensePlate}`"
		:back-to="MOTORCYCLE_LIST"
	>
		<div class="flex flex-col md:flex-row gap-6 items-center md:items-start">
			<!-- Icône Moto -->
			<TheIcon
				:icon="mdiMotorbike"
				size="160"
				class="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full p-4 shadow-lg"
			/>

			<!-- Informations Moto -->
			<div class="flex-1 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
				<div class="mb-6 border-b pb-4 space-y-2">
					<h2 class="text-3xl font-bold text-gray-900">
						{{ motorcycle.brand }} {{ motorcycle.model }}
					</h2>

					<p class="text-sm text-gray-500">
						Plaque d'immatriculation :
						<span class="font-mono bg-gray-100 px-2 py-1 rounded">{{ motorcycle.licensePlate }}</span>
					</p>
				</div>

				<div class="space-y-4">
					<div class="flex items-center gap-2">
						<span class="font-semibold text-gray-700">Année :</span>

						<span class="text-gray-800">{{ motorcycle.year }}</span>
					</div>

					<div class="flex items-center gap-2">
						<span class="font-semibold text-gray-700">Prix :</span>

						<span class="text-gray-800 font-medium">
							{{
								new Intl.NumberFormat("fr-FR", {
									style: "currency",
									currency: "EUR",
								}).format(motorcycle.price)
							}}
						</span>
					</div>

					<div class="flex items-center gap-2">
						<span class="font-semibold text-gray-700">Kilométrage :</span>

						<span class="text-gray-800">{{ motorcycle.mileage }} Km</span>
					</div>

					<div class="flex items-center gap-2">
						<span class="font-semibold text-gray-700">Intervalle de maintenance :</span>

						<span class="text-gray-800">{{ motorcycle.maintenanceInterval }} Km</span>
					</div>
				</div>
			</div>
		</div>
	</AdminSection>
</template>
