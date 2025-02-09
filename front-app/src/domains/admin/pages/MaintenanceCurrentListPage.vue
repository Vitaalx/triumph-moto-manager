<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import { type formattedMaintenance } from "@/schemas/maintenanceSchema";
import { useMaintenanceCurrentGetAll } from "../composables/useMaintenanceCurrentGetAll";
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

const { DRIVER_PAGE, MOTORCYCLE_PAGE, MAINTENANCE_EDIT } = routerPageName;

const { maintenances, isLoading } = useMaintenanceCurrentGetAll();

const dateFormatter = new DateFormatter("fr-FR", {
	dateStyle: "medium",
});

const columns: ColumnDef<formattedMaintenance>[] = [
	{
		accessorKey: "driver",
		header: ({ column }: { column: Column<formattedMaintenance, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["ID conducteur", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMaintenance> }) => h(RouterLink, {
			to: { name: DRIVER_PAGE, params: { driverId: row.getValue("driver").id } },
			class: "text-blue-500",
		} as RouterLinkProps, row.getValue("driver").fullName.value),
	},
	{
		accessorKey: "motorcycleId",
		header: ({ column }: { column: Column<formattedMaintenance, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Plaque", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMaintenance> }) => h(RouterLink, {
			to: { name: MOTORCYCLE_PAGE, params: { licensePlate: row.getValue("motorcycleId") } },
			class: "text-blue-500",
		} as RouterLinkProps, row.getValue("motorcycleId")),
	},
	{
		accessorKey: "technicalRecommendations",
		header: ({ column }: { column: Column<formattedMaintenance, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Recommendation", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMaintenance> }) =>
			h("div", { class: "" }, row.getValue("technicalRecommendations")),
	},
	{
		accessorKey: "date",
		header: ({ column }: { column: Column<formattedMaintenance, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Date", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMaintenance> }) => {
			const date = row.getValue("date") as string;
			const formattedDate = new Date(date);

			return h("div", { class: "" }, dateFormatter.format(formattedDate));
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const maintenance = row.original;

			return h(DataTableDropdownAction, {
				copyText: "Copier l'ID",
				item: maintenance.id,
				editPath: { name: MAINTENANCE_EDIT, params: { maintenanceId: maintenance.id } },
			});
		},
	}
];
</script>

<template>
	<AdminSection title="Entretiens en cours">
		<div
			v-if="isLoading"
			class="flex justify-center items-center h-40"
		>
			<p>Chargement des données...</p>
		</div>

		<DataTable
			v-else
			:data="maintenances"
			:columns="columns"
		/>
	</AdminSection>
</template>
