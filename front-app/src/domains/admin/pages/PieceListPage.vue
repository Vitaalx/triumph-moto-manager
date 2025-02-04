<script setup lang="ts">
import { type SparePart } from "@/schemas/sparePartSchema";
import { useSparePartGetAll } from "../composables/useSparePartGetAll";
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

const { spareParts, isLoading } = useSparePartGetAll();

const columns: ColumnDef<SparePart>[] = [
	{
		accessorKey: "refNumber",
		header: ({ column }: { column: Column<SparePart, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Ref", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<SparePart> }) => h("div", { class: "" }, row.getValue("refNumber")),
	},
	{
		accessorKey: "brand",
		header: ({ column }: { column: Column<SparePart, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Marque", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<SparePart> }) => h("div", { class: "" }, row.getValue("brand")),
	},
	{
		accessorKey: "name",
		header: ({ column }: { column: Column<SparePart, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Nom", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<SparePart> }) => h("div", { class: "" }, row.getValue("name")),
	},
	{
		accessorKey: "price",
		header: ({ column }: { column: Column<SparePart, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Prix", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<SparePart> }) => {
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
		accessorKey: "stock",
		header: ({ column }: { column: Column<SparePart, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Stock", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<SparePart> }) => h("div", { class: "" }, row.getValue("stock")),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const sparePart = row.original;

			return h(DataTableDropdownAction, {
				copyText: "Copier l'ID",
				item: sparePart.id,
			});
		},
	}
];
</script>

<template>
	<AdminSection title="Liste des pièces">
		<div
			v-if="isLoading"
			class="flex justify-center items-center h-40"
		>
			<p>Chargement des données...</p>
		</div>

		<DataTable
			v-else
			:data="spareParts"
			:columns="columns"
		/>
	</AdminSection>
</template>
