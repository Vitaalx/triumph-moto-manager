<script setup lang="ts">
import { type formattedDriver } from "@/schemas/driverSchema";
import type {
	ColumnDef,
	Row,
	Column,
} from "@tanstack/vue-table";
import TheButton from "@/components/ui/button/TheButton.vue";
import { ArrowUpDown } from "lucide-vue-next";
import { h } from "vue";
import DriverTableDropdownAction from "../components/DriverTableDropdownAction.vue";
import AdminSection from "../components/AdminSection.vue";
import DataTable from "../components/DataTable.vue";
import { useDriverGetAll } from "../composables/useDriverGetAll";

const { drivers, isLoading } = useDriverGetAll();

const columns: ColumnDef<formattedDriver>[] = [
	{
		accessorKey: "fullName",
		id: "fullName",
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
		id: "email",
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
		id: "motorcycleLicenseType",
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
		cell: ({ row }: { row: Row<formattedDriver> }) => {
			const driver = row.original;

			return h("div", { class: "relative" }, h(DriverTableDropdownAction, {
				driverId: driver.id,
				email: driver.email,
			}));
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
		>
			<template #details="{ row }">
				{{ JSON.stringify(row.original) }}
			</template>
		</DataTable>
	</AdminSection>
</template>
