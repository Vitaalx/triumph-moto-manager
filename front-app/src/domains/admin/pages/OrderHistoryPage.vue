<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import { type Order } from "@/schemas/orderSchema";
import { useOrderHistoryGetAll } from "../composables/useOrderHistoryGetAll";
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

const { ORDER_PAGE } = routerPageName;

const { orders, isLoading } = useOrderHistoryGetAll();

const columns: ColumnDef<Order>[] = [
	{
		accessorKey: "supplierName",
		header: ({ column }: { column: Column<Order, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Fournisseur", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<Order> }) => h("div", { class: "" }, row.getValue("supplierName")),
	},
	{
		accessorKey: "parts",
		header: ({ column }: { column: Column<Order, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Nombres de pièces", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<Order> }) => h("div", { class: "" }, (row.getValue("parts") as Order["parts"]).length),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const order = row.original;

			return h(DataTableDropdownAction, {
				copyText: "Copier l'ID",
				item: order.id,
				viewPath: { name: ORDER_PAGE, params: { orderId: order.id } },
			});
		},
	}
];
</script>

<template>
	<AdminSection title="Historique des commandes">
		<div
			v-if="isLoading"
			class="flex justify-center items-center h-40"
		>
			<p>Chargement des données...</p>
		</div>

		<DataTable
			v-else
			:data="orders"
			:columns="columns"
		/>
	</AdminSection>
</template>
