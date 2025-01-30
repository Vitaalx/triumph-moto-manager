<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import { type formattedIncident } from "@/schemas/incidentSchema";
import { useIncidentGetAll } from "../composables/useIncidentGetAll";
import { useIncidentDelete } from "../composables/useIncidentDelete";
import { DateFormatter } from "@internationalized/date";
import type {
	ColumnDef,
	Row,
	Column,
} from "@tanstack/vue-table";
import { RouterLink, type RouterLinkProps } from "vue-router";
import TheButton from "@/components/ui/button/TheButton.vue";
import { ArrowUpDown } from "lucide-vue-next";
import { h } from "vue";
import DataTableDropdownAction from "../components/DataTableDropdownAction.vue";
import AdminSection from "../components/AdminSection.vue";
import DataTable from "../components/DataTable.vue";

const { DRIVER_PAGE, MOTORCYCLE_PAGE, INCIDENT_EDIT } = routerPageName;

const { incidents, isLoading } = useIncidentGetAll();
const { deleteIncident } = useIncidentDelete();

const dateFormatter = new DateFormatter("fr-FR", {
	dateStyle: "medium",
});

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
		accessorKey: "driverId",
		header: ({ column }: { column: Column<formattedIncident, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["ID conducteur", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedIncident> }) => h(RouterLink, {
			to: { name: DRIVER_PAGE, params: { driverId: row.getValue("driverId") } },
			class: "text-blue-500",
		} as RouterLinkProps, row.getValue("driverId")),
	},
	{
		accessorKey: "motorcycleId",
		header: ({ column }: { column: Column<formattedIncident, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Plaque", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedIncident> }) => h(RouterLink, {
			to: { name: MOTORCYCLE_PAGE, params: { licensePlate: row.getValue("motorcycleId") } },
			class: "text-blue-500",
		} as RouterLinkProps, row.getValue("motorcycleId")),
	},
	{
		accessorKey: "incidentDate",
		header: ({ column }: { column: Column<formattedIncident, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Fin", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedIncident> }) => {
			const incidentDate = row.getValue("incidentDate") as string;
			const date = new Date(incidentDate);

			return h("div", { class: "" }, dateFormatter.format(date));
		},
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
			const incident = row.original;

			return h(DataTableDropdownAction, {
				copyText: "Copier l'ID",
				item: incident.id,
				editPath: { name: INCIDENT_EDIT, params: { incidentId: incident.id } },
				onDelete: (incidentId) => {
					deleteIncident(incidentId);
					// Update after deletion
					window.location.reload();
				},
			});
		},
	}
];
</script>

<template>
	<AdminSection title="Liste des incidents">
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
