<script setup lang="ts">
import { useRouteParams } from "@/composables/useRouteParams";
import { routerPageName } from "@/router/routerPageName";
import { z } from "zod";
import AdminSection from "../components/AdminSection.vue";
import { useDriverGet } from "../composables/useDriverGet";
import TheIcon from "@/components/TheIcon.vue";
import { mdiAccount } from "@mdi/js";
import MotorcycleTable from "../components/MotorcycleTable.vue";

const params = useRouteParams({
	driverId: z.string(),
});
const { DRIVER_LIST } = routerPageName;
const { driver } = useDriverGet(params.value.driverId);
</script>

<template>
	<AdminSection
		:title="`Profil conducteur de ${driver.fullName}`"
		:back-to="DRIVER_LIST"
	>
		<div class="flex flex-col md:flex-row gap-6 items-center md:items-start">
			<TheIcon
				:icon="mdiAccount"
				size="160"
				class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full p-4 shadow-lg"
			/>

			<div class="flex-1 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
				<div class="mb-6 border-b pb-4 space-y-2">
					<h2 class="text-3xl font-bold text-gray-900">
						{{ driver.fullName }}
					</h2>

					<p class="text-sm text-gray-500">
						ID: <span class="font-mono bg-gray-100 px-2 py-1 rounded">{{ driver.id }}</span>
					</p>
				</div>

				<div class="space-y-4">
					<div class="flex items-center gap-2">
						<span class="font-semibold text-gray-700">Âge:</span>

						<span class="text-gray-800">{{ driver.age }} ans</span>
					</div>

					<div class="flex items-center gap-2">
						<span class="font-semibold text-gray-700">Email:</span>

						<a 
							:href="`mailto:${driver.email}`"
							target="_blank"
							class="text-blue-600 hover:underline"
						>
							{{ driver.email }}
						</a>
					</div>

					<div class="flex items-center gap-2">
						<span class="font-semibold text-gray-700">Type de permis moto:</span>

						<span class="text-gray-800">{{ driver.motorcycleLicenseType }}</span>
					</div>

					<div class="flex items-center gap-2">
						<span class="font-semibold text-gray-700">Expérience de conduite:</span>

						<span class="text-gray-800">{{ driver.drivingExperience }}</span>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-10 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
			<h3 class="text-2xl font-bold text-gray-900 mb-4">
				Motos possédées
			</h3>

			<div class="overflow-x-auto">
				<MotorcycleTable
					:motorcycles="driver.motorcycles"
					class="min-w-full rounded-lg shadow-sm"
				/>
			</div>
		</div>
	</AdminSection>
</template>
