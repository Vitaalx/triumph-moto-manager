<script setup lang="ts">
// import { routerPageName } from "@/router/routerPageName";
import { type formattedIncident } from "@/schemas/incidentSchema";
import { useIncidentGetAll } from "../composables/useIncidentGetAll";
// import { useDriverDelete } from "../composables/useDriverDelete";
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

// const { DRIVER_PAGE, DRIVER_EDIT } = routerPageName;

const { incidents, isLoading } = useIncidentGetAll();
// const { deleteDriver } = useDriverDelete();

const columns: ColumnDef<formattedIncident>[] = [
	{
		accessorKey: "type",
		header: ({ column }: { column: Column<formattedIncident, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Type", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedIncident> }) => h("div", { class: "" }, row.getValue("type")),
	},
	{
		accessorKey: "description",
		header: ({ column }: { column: Column<formattedIncident, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Description", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedIncident> }) => h("div", { class: "" }, row.getValue("description")),
	},
	{
		accessorKey: "motorcycleId",
		header: ({ column }: { column: Column<formattedIncident, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Moto", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedIncident> }) => h("div", { class: "" }, row.getValue("motorcycleId")),
	},
	{
		accessorKey: "driverId",
		header: ({ column }: { column: Column<formattedIncident, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["ID conducteur", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedIncident> }) => h("div", { class: "" }, row.getValue("driverId")),
	},
	{
		accessorKey: "incidentDate",
		header: ({ column }: { column: Column<formattedIncident, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Date", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedIncident> }) => h("div", { class: "" }, row.getValue("incidentDate")),
	},
	{
		accessorKey: "incidentTime",
		header: ({ column }: { column: Column<formattedIncident, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Heure", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedIncident> }) => h("div", { class: "" }, row.getValue("incidentTime")),
	},
	{
		accessorKey: "location",
		header: ({ column }: { column: Column<formattedIncident, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Lieu", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedIncident> }) => h("div", { class: "" }, row.getValue("location")),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const driver = row.original;

			return h(DataTableDropdownAction, {
				copyText: "Copier l'ID",
				item: driver.id,
				// viewPath: { name: DRIVER_PAGE, params: { driverId: driver.id } },
				// editPath: { name: DRIVER_EDIT, params: { driverId: driver.id } },
				// onDelete: (driverId) => {
				// 	deleteDriver(driverId);
				// 	// Update after deletion
				// 	window.location.reload();
				// },
			});
		},
	}
];
</script>

<template>
	<AdminSection title="Liste des conducteurs">
		<div
			v-if="isLoading"
			class="flex justify-center items-center h-40"
		>
			<p>Chargement des données...</p>
		</div>

		<DataTable
			v-else
			:data="incidents"
			:columns="columns"
		/>
	</AdminSection>
</template>
