<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import { type formattedMotorcycle } from "@/schemas/motorcycleSchema";
import { useMotorcycleGetAll } from "../composables/useMotorcycleGetAll";
import { DateFormatter } from "@internationalized/date";
import type {
	ColumnDef,
	Row,
	Column,
} from "@tanstack/vue-table";
import TheButton from "@/components/ui/button/TheButton.vue";
import { ArrowUpDown } from "lucide-vue-next";
import { h } from "vue";
import DataTableDropdownAction from "../components/DataTableDropdownAction.vue";
import AdminSection from "../components/AdminSection.vue";
import DataTable from "../components/DataTable.vue";

const { MOTORCYCLE_PAGE, MOTORCYCLE_EDIT } = routerPageName;

const { motorcycles, isLoading } = useMotorcycleGetAll();

const dateFormatter = new DateFormatter("fr-FR", {
	dateStyle: "medium",
});

const columns: ColumnDef<formattedMotorcycle>[] = [
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
		accessorKey: "mileage",
		header: ({ column }: { column: Column<formattedMotorcycle, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Kilométrage", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycle> }) => h("div", { class: "" }, row.getValue("mileage") + " Km"),
	},
	{
		accessorKey: "maintenanceInterval",
		header: ({ column }: { column: Column<formattedMotorcycle, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Int. de maintenance", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycle> }) =>
			h("div", { class: "" }, row.getValue("maintenanceInterval") + " Km"),
	},
	{
		accessorKey: "warrantyEndDate",
		header: ({ column }: { column: Column<formattedMotorcycle, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Fin de garentie", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycle> }) => {
			const warrantyEndDate = row.getValue("warrantyEndDate") as string;
			const date = warrantyEndDate ? dateFormatter.format(new Date(warrantyEndDate)) : "Pas de garantie";

			return h("div", { class: "" }, date);
		},
			
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const motorcycle = row.original;

			return h(DataTableDropdownAction, {
				copyText: "Copier la plaque",
				item: motorcycle.licensePlate,
				viewPath: { name: MOTORCYCLE_PAGE, params: { licensePlate: motorcycle.licensePlate } },
				editPath: { name: MOTORCYCLE_EDIT, params: { licensePlate: motorcycle.licensePlate } },
			});
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
