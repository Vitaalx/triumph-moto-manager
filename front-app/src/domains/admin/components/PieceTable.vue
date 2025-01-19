<script setup lang="ts">
import type {
	ColumnDef,
	Row,
	Column,
	ColumnFiltersState,
	ExpandedState,
	SortingState,
	VisibilityState,
} from "@tanstack/vue-table";
import TheButton from "@/components/ui/button/TheButton.vue";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TheInput } from "@/components/ui/input";
import {
	TheTable,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { valueUpdater } from "@lib/utils";
import {
	FlexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useVueTable,
} from "@tanstack/vue-table";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import { h, ref } from "vue";
import PieceTableDropdownAction from "./PieceTableDropdownAction.vue";

export interface Piece {
  id: string
  price: number
  status: "in stock" | "low stock" | "out of stock"
  name: string
}

const data: Piece[] = [
	{
		id: "m5gr84i9",
		name: "Kit chaîne",
		price: 150,
		status: "in stock",
	},
	{
		id: "3u1reuv4",
		name: "Plaquettes de frein",
		price: 35,
		status: "in stock",
	},
	{
		id: "derv1ws0",
		name: "Filtre à air",
		price: 20,
		status: "low stock",
	},
	{
		id: "5kma53ae",
		name: "Amortisseur arrière",
		price: 250,
		status: "in stock",
	},
	{
		id: "bhqecj4p",
		name: "Pneu",
		price: 120,
		status: "out of stock",
	},
];

const columns: ColumnDef<Piece>[] = [
	{
		accessorKey: "status",
		header: "Statut",
		cell: ({ row }: { row: Row<Piece> }) => h("div", { class: "capitalize" }, row.getValue("status")),
	},
	{
		accessorKey: "name",
		header: ({ column }: { column: Column<Piece, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Nom", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<Piece> }) => h("div", { class: "" }, row.getValue("name")),
	},
	{
		accessorKey: "price",
		header: () => h("div", { class: "text-right" }, "Prix"),
		cell: ({ row }: { row: Row<Piece> }) => {
			const price = Number.parseFloat(row.getValue("price"));

			// Format the price as a euro price
			const formatted = new Intl.NumberFormat("fr-FR", {
				style: "currency",
				currency: "EUR",
			}).format(price);

			return h("div", { class: "text-right font-medium" }, formatted);
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }: { row: Row<Piece> }) => {
			const piece = row.original;

			return h("div", { class: "relative" }, h(PieceTableDropdownAction, {
				id: piece.id,
				onExpand: row.toggleExpanded,
			}));
		},
	}
];

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const expanded = ref<ExpandedState>({});

const table = useVueTable({
	data,
	columns,
	getCoreRowModel: getCoreRowModel(),
	getPaginationRowModel: getPaginationRowModel(),
	getSortedRowModel: getSortedRowModel(),
	getFilteredRowModel: getFilteredRowModel(),
	getExpandedRowModel: getExpandedRowModel(),
	onSortingChange: (
		updaterOrValue: SortingState | ((prev: SortingState) => SortingState)
	) => valueUpdater(updaterOrValue, sorting),

	onColumnFiltersChange: (
		updaterOrValue: ColumnFiltersState | ((prev: ColumnFiltersState) => ColumnFiltersState)
	) => valueUpdater(updaterOrValue, columnFilters),

	onColumnVisibilityChange: (
		updaterOrValue: VisibilityState | ((prev: VisibilityState) => VisibilityState)
	) => valueUpdater(updaterOrValue, columnVisibility),

	onRowSelectionChange: (
		updaterOrValue: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)
	) => valueUpdater(updaterOrValue, rowSelection),

	onExpandedChange: (
		updaterOrValue: ExpandedState | ((prev: ExpandedState) => ExpandedState)
	) => valueUpdater(updaterOrValue, expanded),

	state: {
		get sorting() { return sorting.value; },
		get columnFilters() { return columnFilters.value; },
		get columnVisibility() { return columnVisibility.value; },
		get rowSelection() { return rowSelection.value; },
		get expanded() { return expanded.value; },
	},
});
</script>

<template>
	<div class="w-full">
		<div class="flex gap-2 items-center py-4">
			<TheInput
				class="max-w-sm"
				placeholder="Filter par nom..."
				:model-value="table.getColumn('name')?.getFilterValue() as string"
				@update:model-value=" table.getColumn('name')?.setFilterValue($event)"
			/>

			<DropdownMenu>
				<DropdownMenuTrigger as-child>
					<TheButton
						variant="outline"
						class="ml-auto"
					>
						Colonnes <ChevronDown class="ml-2 h-4 w-4" />
					</TheButton>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end">
					<DropdownMenuCheckboxItem
						v-for="column in table.getAllColumns().filter((column: Column<Piece, unknown>) => column.getCanHide())"
						:key="column.id"
						class="capitalize"
						:checked="column.getIsVisible()"
						@update:checked="(value) => {
							column.toggleVisibility(!!value)
						}"
					>
						{{ column.id }}
					</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>

		<div class="rounded-md border">
			<TheTable>
				<TableHeader>
					<TableRow
						v-for="headerGroup in table.getHeaderGroups()"
						:key="headerGroup.id"
					>
						<TableHead
							v-for="header in headerGroup.headers"
							:key="header.id"
						>
							<FlexRender
								v-if="!header.isPlaceholder"
								:render="header.column.columnDef.header"
								:props="header.getContext()"
							/>
						</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					<template v-if="table.getRowModel().rows?.length">
						<template
							v-for="row in table.getRowModel().rows"
							:key="row.id"
						>
							<TableRow>
								<TableCell
									v-for="cell in row.getVisibleCells()"
									:key="cell.id"
								>
									<FlexRender
										:render="cell.column.columnDef.cell"
										:props="cell.getContext()"
									/>
								</TableCell>
							</TableRow>

							<TableRow v-if="row.getIsExpanded()">
								<TableCell :colspan="row.getAllCells().length">
									{{ JSON.stringify(row.original) }}
								</TableCell>
							</TableRow>
						</template>
					</template>
  
					<TableRow v-else>
						<TableCell
							:colspan="columns.length"
							class="h-24 text-center"
						>
							Aucun résultat
						</TableCell>
					</TableRow>
				</TableBody>
			</TheTable>
		</div>
  
		<div class="flex items-center justify-end space-x-2 py-4">
			<div class="space-x-2">
				<TheButton
					variant="outline"
					size="sm"
					:disabled="!table.getCanPreviousPage()"
					@click="table.previousPage()"
				>
					Précédent
				</TheButton>

				<TheButton
					variant="outline"
					size="sm"
					:disabled="!table.getCanNextPage()"
					@click="table.nextPage()"
				>
					Suivant
				</TheButton>
			</div>
		</div>
	</div>
</template>
