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

const { DRIVER_PAGE, MOTORCYCLE_PAGE, MAINTENANCE_PAGE, MAINTENANCE_EDIT } = routerPageName;

const { maintenances, isLoading } = useMaintenanceCurrentGetAll();

const dateFormatter = new DateFormatter("fr-FR", {
	dateStyle: "medium",
});

const columns: ColumnDef<formattedMaintenance>[] = [
	{
		accessorKey: "status",
		header: ({ column }: { column: Column<formattedMaintenance, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Statut", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMaintenance> }) => h("div", { class: "" }, row.getValue("status")),
	},
	{
		accessorKey: "driverId",
		header: ({ column }: { column: Column<formattedMaintenance, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["ID conducteur", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMaintenance> }) => h(RouterLink, {
			to: { name: DRIVER_PAGE, params: { driverId: row.getValue("driverId") } },
			class: "text-blue-500",
		} as RouterLinkProps, row.getValue("driverId")),
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
		accessorKey: "totalSparePartsPrice",
		header: ({ column }: { column: Column<formattedMaintenance, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Prix des pièces", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMaintenance> }) => {
			const totalSparePartsPrice = Number.parseFloat(row.getValue("totalSparePartsPrice"));

			// Format the price as a euro price
			const formatted = new Intl.NumberFormat("fr-FR", {
				style: "currency",
				currency: "EUR",
			}).format(totalSparePartsPrice);

			return h("div", { class: "font-medium" }, formatted);
		},
	},
	{
		accessorKey: "totalMaintenancePrice",
		header: ({ column }: { column: Column<formattedMaintenance, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Prix total", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMaintenance> }) => {
			const totalMaintenancePrice = Number.parseFloat(row.getValue("totalMaintenancePrice"));

			// Format the price as a euro price
			const formatted = new Intl.NumberFormat("fr-FR", {
				style: "currency",
				currency: "EUR",
			}).format(totalMaintenancePrice);

			return h("div", { class: "font-medium" }, formatted);
		},
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
				viewPath: { name: MAINTENANCE_PAGE, params: { maintenanceId: maintenance.id } },
				editPath: { name: MAINTENANCE_EDIT, params: { maintenanceId: maintenance.id } },
				// onDelete: (maintenanceId) => {
				// 	deleteMaintenance(maintenanceId);
				// 	// Update after deletion
				// 	window.location.reload();
				// },
			});
		},
	}
];
</script>

<template>
	<AdminSection title="Liste des entretiens">
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
