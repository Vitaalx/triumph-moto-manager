<script setup lang="ts">
import { computed, h } from "vue";
import { z } from "zod";
import { useRouteParams } from "@/composables/useRouteParams";
import { routerPageName } from "@/router/routerPageName";
import { useDriverGet } from "../composables/useDriverGet";
import type { formattedMotorcycle, Motorcycle } from "@/schemas/motorcycleSchema";
import type { formattedTrial, Trial } from "@/schemas/trialSchema";
import { DateFormatter } from "@internationalized/date";
import type {
	ColumnDef,
	Row,
	Column,
} from "@tanstack/vue-table";
import { ArrowUpDown } from "lucide-vue-next";
import AdminSection from "../components/AdminSection.vue";
import TheIcon from "@/components/TheIcon.vue";
import TheButton from "@/components/ui/button/TheButton.vue";
import { mdiAccount } from "@mdi/js";
import DataTable from "../components/DataTable.vue";

const params = useRouteParams({
	driverId: z.string(),
});

const { DRIVER_LIST } = routerPageName;
const { driver, isLoading } = useDriverGet(params.value.driverId);

const dateFormatter = new DateFormatter("fr-FR", {
	dateStyle: "medium",
});

const formattedMotorcycles = computed(() =>
	driver.value.motorcycles.map((motorcycle: Motorcycle) => ({
		...motorcycle,
		licensePlate: motorcycle.licensePlate.value,
		year: motorcycle.year.value,
		price: motorcycle.price.value,
	}))
);
const formattedMotorcycleTrials = computed(() => {
	const today = new Date();

	return driver.value.motorcycleTries.map((motorcycleTrial: Trial) => {
		const startDate = new Date(motorcycleTrial.startDate);
		const endDate = new Date(motorcycleTrial.endDate);
		let status: string;

		if (today < startDate) {
			status = "A venir";
		} else if (today >= startDate && today <= endDate) {
			status = "En cours";
		} else {
			status = "Passé";
		}

		return {
			...motorcycleTrial,
			status: status,
			motorcycleId: motorcycleTrial.motorcycleId.value,
			startDate: motorcycleTrial.startDate,
			endDate: motorcycleTrial.endDate
		};
	});
});



const motorcycleColumns: ColumnDef<formattedMotorcycle>[] = [
	{
		accessorKey: "licensePlate",
		header: ({ column }: { column: Column<formattedMotorcycle, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Plaque", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycle> }) => h("div", { class: "" }, row.getValue("licensePlate")),
	},
	{
		accessorKey: "brand",
		header: ({ column }: { column: Column<formattedMotorcycle, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Marque", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycle> }) => h("div", { class: "" }, row.getValue("brand")),
	},
	{
		accessorKey: "model",
		header: ({ column }: { column: Column<formattedMotorcycle, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Modèle", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycle> }) => h("div", { class: "" }, row.getValue("model")),
	},
	{
		accessorKey: "year",
		header: ({ column }: { column: Column<formattedMotorcycle, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Année", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycle> }) => h("div", { class: "" }, row.getValue("year")),
	},
	{
		accessorKey: "price",
		header: ({ column }: { column: Column<formattedMotorcycle, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Prix", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycle> }) => {
			const price = Number.parseFloat(row.getValue("price"));

			// Format the price as a euro price
			const formatted = new Intl.NumberFormat("fr-FR", {
				style: "currency",
				currency: "EUR",
			}).format(price);

			return h("div", { class: "font-medium" }, formatted);
		},
	},
	{
		accessorKey: "maintenanceInterval",
		header: ({ column }: { column: Column<formattedMotorcycle, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Int. de maintenance", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycle> }) => h("div", { class: "" }, row.getValue("maintenanceInterval")),
	},
];

const motorcycleTrialsColumns: ColumnDef<formattedTrial>[] = [
	{
		accessorKey: "status",
		header: ({ column }: { column: Column<formattedTrial, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Statut", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedTrial> }) => {
			const status = row.getValue("status") as string;
			let className = "";
			switch (status) {
			case "A venir":
				className = "text-blue-600";
				break;
			case "En cours":
				className = "text-green-600";
				break;
			case "Passé":
				className = "text-gray-600";
				break;
			}
			return h("div", { class: className }, status);
		},
	},
	{
		accessorKey: "motorcycleId",
		header: ({ column }: { column: Column<formattedTrial, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Moto", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedTrial> }) => h("div", { class: "" }, row.getValue("motorcycleId")),
	},
	{
		accessorKey: "startDate",
		header: ({ column }: { column: Column<formattedTrial, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Début", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedTrial> }) => {
			const startDate = row.getValue("startDate") as string;
			const date = new Date(startDate);
			
			return h("div", { class: "" }, dateFormatter.format(date));
		},
	},
	{
		accessorKey: "endDate",
		header: ({ column }: { column: Column<formattedTrial, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Fin", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedTrial> }) => {
			const endDate = row.getValue("endDate") as string;
			const date = new Date(endDate);

			return h("div", { class: "" }, dateFormatter.format(date));
		},
	},
];
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
						ID : <span class="font-mono bg-gray-100 px-2 py-1 rounded">{{ driver.id }}</span>
					</p>
				</div>

				<div class="space-y-4">
					<div class="flex items-center gap-2">
						<span class="font-semibold text-gray-700">Âge :</span>

						<span class="text-gray-800">{{ driver.age }} ans</span>
					</div>

					<div class="flex items-center gap-2">
						<span class="font-semibold text-gray-700">Email :</span>

						<a 
							:href="`mailto:${driver.email}`"
							target="_blank"
							class="text-blue-600 hover:underline"
						>
							{{ driver.email }}
						</a>
					</div>

					<div class="flex items-center gap-2">
						<span class="font-semibold text-gray-700">Type de permis moto :</span>

						<span class="text-gray-800">{{ driver.motorcycleLicenseType }}</span>
					</div>

					<div class="flex items-center gap-2">
						<span class="font-semibold text-gray-700">Expérience de conduite :</span>

						<span class="text-gray-800">{{ driver.drivingExperience }}</span>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-10 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
			<h3 class="text-2xl font-bold text-gray-900 mb-4">
				Motos possédées
			</h3>

			<div
				v-if="isLoading"
				class="flex justify-center items-center h-40"
			>
				<p>Chargement des données...</p>
			</div>

			<DataTable
				v-else
				:data="formattedMotorcycles"
				:columns="motorcycleColumns"
			/>
		</div>

		<div class="mt-10 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
			<h3 class="text-2xl font-bold text-gray-900 mb-4">
				Liste des essais
			</h3>

			<div
				v-if="isLoading"
				class="flex justify-center items-center h-40"
			>
				<p>Chargement des données...</p>
			</div>

			<DataTable
				v-else
				:data="formattedMotorcycleTrials"
				:columns="motorcycleTrialsColumns"
			/>
		</div>
	</AdminSection>
</template>
