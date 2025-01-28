<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import { type formattedDriver } from "@/schemas/driverSchema";
import { useDriverGetAll } from "../composables/useDriverGetAll";
import { useDriverDelete } from "../composables/useDriverDelete";
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

const { DRIVER_PAGE, DRIVER_EDIT } = routerPageName;

const { drivers, isLoading } = useDriverGetAll();
const { deleteDriver } = useDriverDelete();

const columns: ColumnDef<formattedDriver>[] = [
	{
		accessorKey: "fullName",
		header: ({ column }: { column: Column<formattedDriver, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Conducteur", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedDriver> }) => h("div", { class: "" }, row.getValue("fullName")),
	},
	{
		accessorKey: "age",
		header: ({ column }: { column: Column<formattedDriver, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Age", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedDriver> }) => h("div", { class: "" }, row.getValue("age")),
	},
	{
		accessorKey: "email",
		header: ({ column }: { column: Column<formattedDriver, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Email", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedDriver> }) => h("div", { class: "" }, row.getValue("email")),
	},
	{
		accessorKey: "motorcycleLicenseType",
		header: ({ column }: { column: Column<formattedDriver, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Permis", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedDriver> }) => h("div", { class: "" }, row.getValue("motorcycleLicenseType")),
	},
	{
		accessorKey: "drivingExperience",
		header: ({ column }: { column: Column<formattedDriver, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Experience", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedDriver> }) => h("div", { class: "" }, row.getValue("drivingExperience")),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const driver = row.original;

			return h(DataTableDropdownAction, {
				copyText: "Copier l'ID",
				item: driver.id,
				viewPath: { name: DRIVER_PAGE, params: { driverId: driver.id } },
				editPath: { name: DRIVER_EDIT, params: { driverId: driver.id } },
				onDelete: (driverId) => {
					deleteDriver(driverId);
					// Update after deletion
					window.location.reload();
				},
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
			:data="drivers"
			:columns="columns"
		/>
	</AdminSection>
</template>
