<script setup lang="ts">
import { type formattedMotorcycleTrial } from "@/schemas/motorcycleTrialSchema";
import { useMotorcycleTrialNextGetAll } from "../composables/useMotorcycleTrialNextGetAll";
import { useMotorcycleTrialDelete } from "../composables/useMotorcycleTrialDelete";
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

const { motorcycleTrials, isLoading } = useMotorcycleTrialNextGetAll();
const { deleteMotorcycleTrial } = useMotorcycleTrialDelete();

const dateFormatter = new DateFormatter("fr-FR", {
	dateStyle: "medium",
});

const columns: ColumnDef<formattedMotorcycleTrial>[] = [
	{
		accessorKey: "driverId",
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
		header: ({ column }: { column: Column<formattedMotorcycleTrial, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Début", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycleTrial> }) => {
			const startDate = row.getValue("startDate") as string;
			const date = new Date(startDate);
			
			return h("div", { class: "" }, dateFormatter.format(date));
		},
	},
	{
		accessorKey: "endDate",
		header: ({ column }: { column: Column<formattedMotorcycleTrial, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Fin", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycleTrial> }) => {
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
				onDelete: (motorcycleTrialId) => {
					deleteMotorcycleTrial(motorcycleTrialId);
					// Update after deletion
					window.location.reload();
				},
			});
		},
	}
];
</script>

<template>
	<AdminSection title="Essais moto à venir">
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
