<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import { type formattedTrial } from "@/schemas/trialSchema";
import { useTrialCurrentGetAll } from "../composables/useTrialCurrentGetAll";
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

const { DRIVER_PAGE, MOTORCYCLE_PAGE } = routerPageName;

const { trials, isLoading } = useTrialCurrentGetAll();

const dateFormatter = new DateFormatter("fr-FR", {
	dateStyle: "medium",
});

const columns: ColumnDef<formattedTrial>[] = [
	{
		accessorKey: "driverId",
		header: ({ column }: { column: Column<formattedTrial, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["ID conducteur", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedTrial> }) => h(RouterLink, {
			to: { name: DRIVER_PAGE, params: { driverId: row.getValue("driverId") } },
			class: "text-blue-500",
		} as RouterLinkProps, row.getValue("driverId")),
	},
	{
		accessorKey: "motorcycleId",
		header: ({ column }: { column: Column<formattedTrial, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Plaque", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedTrial> }) => h(RouterLink, {
			to: { name: MOTORCYCLE_PAGE, params: { licensePlate: row.getValue("motorcycleId") } },
			class: "text-blue-500",
		} as RouterLinkProps, row.getValue("motorcycleId")),
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
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const motorcycleTrial = row.original;

			return h(DataTableDropdownAction, {
				copyText: "Copier l'ID",
				item: motorcycleTrial.id,
			});
		},
	}
];
</script>

<template>
	<AdminSection title="Essais en cours">
		<div
			v-if="isLoading"
			class="flex justify-center items-center h-40"
		>
			<p>Chargement des données...</p>
		</div>

		<DataTable
			v-else 
			:columns="columns"
			:data="trials"
		/>
	</AdminSection>
</template>
