<script setup lang="ts">
import { type formattedMotorcycle } from "@/schemas/motorcycleSchema";
import type {
	ColumnDef,
	Row,
	Column,
} from "@tanstack/vue-table";
import TheButton from "@/components/ui/button/TheButton.vue";
import { ArrowUpDown } from "lucide-vue-next";
import { h } from "vue";
import MotorcycleTableDropdownAction from "../components/MotorcycleTableDropdownAction.vue";
import AdminSection from "../components/AdminSection.vue";
import DataTable from "../components/DataTable.vue";
import { useMotorcycleGetAll } from "../composables/useMotorcycleGetAll";

const { motorcycles, isLoading } = useMotorcycleGetAll();

const columns: ColumnDef<formattedMotorcycle>[] = [
	{
		accessorKey: "licensePlate",
		id: "licensePlate",
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
		id: "year",
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
		id: "price",
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
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }: { row: Row<formattedMotorcycle> }) => {
			const motorcycle = row.original;

			return h("div", { class: "relative" }, h(MotorcycleTableDropdownAction, {
				licensePlate: motorcycle.licensePlate,
				onExpand: row.toggleExpanded,
			}));
		},
	}
];
</script>

<template>
	<AdminSection title="Liste des motos">
		<div
			v-if="isLoading"
			class="flex justify-center items-center h-40"
		>
			<p>Chargement des données...</p>
		</div>

		<DataTable
			v-else
			:data="motorcycles"
			:columns="columns"
		>
			<template #details="{ row }">
				{{ JSON.stringify(row.original) }}
			</template>
		</DataTable>
	</AdminSection>
</template>
