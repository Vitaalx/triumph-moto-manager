<script setup lang="ts">
import { type formattedMotorcycleTrial } from "@/schemas/motorcycleTrialSchema";
import type {
	ColumnDef,
	Row,
	Column,
} from "@tanstack/vue-table";
import TheButton from "@/components/ui/button/TheButton.vue";
import { ArrowUpDown } from "lucide-vue-next";
import { h } from "vue";
import AdminSection from "../components/AdminSection.vue";
import DataTable from "../components/DataTable.vue";
import { useMotorcycleTrialCurrentGetAll } from "../composables/useMotorcycleTrialCurrentGetAll";

const { motorcycleTrials, isLoading } = useMotorcycleTrialCurrentGetAll();

const columns: ColumnDef<formattedMotorcycleTrial>[] = [
	{
		accessorKey: "driverId",
		id: "driverId",
		header: ({ column }: { column: Column<formattedMotorcycleTrial, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["ID conducteur", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycleTrial> }) => h("div", { class: "" }, row.getValue("driverId")),
	},
	{
		accessorKey: "motorcycleId",
		id: "motorcycleId",
		header: ({ column }: { column: Column<formattedMotorcycleTrial, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Plaque", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycleTrial> }) => h("div", { class: "" }, row.getValue("motorcycleId")),
	},
	{
		accessorKey: "startDate",
		id: "startDate",
		header: ({ column }: { column: Column<formattedMotorcycleTrial, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Début", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycleTrial> }) => h("div", { class: "" }, row.getValue("startDate")),
	},
	{
		accessorKey: "endDate",
		id: "endDate",
		header: ({ column }: { column: Column<formattedMotorcycleTrial, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Fin", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycleTrial> }) => h("div", { class: "" }, row.getValue("endDate")),
	},
];
</script>

<template>
	<AdminSection title="Essais moto en cours">
		<div
			v-if="isLoading"
			class="flex justify-center items-center h-40"
		>
			<p>Chargement des données...</p>
		</div>

		<DataTable
			v-else 
			:columns="columns"
			:data="motorcycleTrials"
		/>
	</AdminSection>
</template>
