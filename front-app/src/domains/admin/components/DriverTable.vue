<script setup lang="ts">
import { type formattedDriver } from "@/schemas/driverSchema";
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
import DriverTableDropdownAction from "./DriverTableDropdownAction.vue";
import { useDriverGetAll } from "../composables/useDriverGetAll";

const { drivers } = useDriverGetAll();

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
const globalFilter = ref("");

const table = useVueTable({
	data: drivers,
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

	onGlobalFilterChange: (
		updaterOrValue: string | ((prev: string) => string)
	) => valueUpdater(updaterOrValue, globalFilter),

	state: {
		get sorting() { return sorting.value; },
		get columnFilters() { return columnFilters.value; },
		get columnVisibility() { return columnVisibility.value; },
		get rowSelection() { return rowSelection.value; },
		get expanded() { return expanded.value; },
		get globalFilter() { return globalFilter.value; },
	},
	globalFilterFn: (row, columnId, filterValue) => {
		return Object.values(row.original).some(value =>
			String(value).toLowerCase().includes(filterValue.toLowerCase())
		);
	},
});
</script>

<template>
	<div class="w-full">
		<div class="flex gap-2 items-center py-4">
			<TheInput
				class="max-w-sm"
				placeholder="Filtrer..."
				:model-value="table.getState().globalFilter"
				@update:model-value="table.setGlobalFilter"
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
						v-for="column in table.getAllColumns().filter((column: Column<formattedDriver, unknown>) => column.getCanHide())"
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
