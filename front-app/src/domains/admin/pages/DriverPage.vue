<script setup lang="ts">
import { computed, h, ref } from "vue";
import { z } from "zod";
import { useRouteParams } from "@/composables/useRouteParams";
import { routerPageName } from "@/router/routerPageName";
import { useDriverGet } from "../composables/useDriverGet";
import { type formattedMotorcycle, type Motorcycle } from "@/schemas/motorcycleSchema";
import type {
	ColumnDef,
	Row,
	Column,
	ColumnFiltersState,
	ExpandedState,
	SortingState,
	VisibilityState,
} from "@tanstack/vue-table";
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
import AdminSection from "../components/AdminSection.vue";
import TheIcon from "@/components/TheIcon.vue";
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
import { mdiAccount } from "@mdi/js";

const params = useRouteParams({
	driverId: z.string(),
});
const { DRIVER_LIST } = routerPageName;
const { driver, isLoading } = useDriverGet(params.value.driverId);
const formattedMotorcycles = computed(() =>
	driver.value.motorcycles.map((motorcycle: Motorcycle) => ({
		...motorcycle,
		licensePlate: motorcycle.licensePlate.value,
		year: motorcycle.year.value,
		price: motorcycle.price.value,
	}))
);

const columns: ColumnDef<formattedMotorcycle>[] = [
	{
		accessorKey: "licensePlate",
		id: "licensePlate",
		header: ({ column }: { column: Column<formattedMotorcycle, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Plaque", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycle> }) => h("div", { class: "" }, row.getValue("licensePlate")),
	},
	{
		accessorKey: "brand",
		header: ({ column }: { column: Column<formattedMotorcycle, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Marque", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycle> }) => h("div", { class: "" }, row.getValue("brand")),
	},
	{
		accessorKey: "model",
		header: ({ column }: { column: Column<formattedMotorcycle, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Modèle", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycle> }) => h("div", { class: "" }, row.getValue("model")),
	},
	{
		accessorKey: "year",
		id: "year",
		header: ({ column }: { column: Column<formattedMotorcycle, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Année", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycle> }) => h("div", { class: "" }, row.getValue("year")),
	},
	{
		accessorKey: "price",
		id: "price",
		header: ({ column }: { column: Column<formattedMotorcycle, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Prix", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycle> }) => {
			const price = Number.parseFloat(row.getValue("price"));

			// Format the price as a euro price
			const formatted = new Intl.NumberFormat("fr-FR", {
				style: "currency",
				currency: "EUR",
			}).format(price);

			return h("div", { class: "font-medium" }, formatted);
		},
	},
	{
		accessorKey: "maintenanceInterval",
		header: ({ column }: { column: Column<formattedMotorcycle, unknown> }) => {
			return h(TheButton, {
				variant: "ghost",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			}, () => ["Int. de maintenance", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
		},
		cell: ({ row }: { row: Row<formattedMotorcycle> }) => h("div", { class: "" }, row.getValue("maintenanceInterval")),
	},
];

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const expanded = ref<ExpandedState>({});
const globalFilter = ref("");

const table = useVueTable({
	data: formattedMotorcycles,
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
	<AdminSection
		:title="`Profil conducteur de ${driver.fullName}`"
		:back-to="DRIVER_LIST"
	>
		<div class="flex flex-col md:flex-row gap-6 items-center md:items-start">
			<TheIcon
				:icon="mdiAccount"
				size="160"
				class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full p-4 shadow-lg"
			/>

			<div class="flex-1 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
				<div class="mb-6 border-b pb-4 space-y-2">
					<h2 class="text-3xl font-bold text-gray-900">
						{{ driver.fullName }}
					</h2>

					<p class="text-sm text-gray-500">
						ID: <span class="font-mono bg-gray-100 px-2 py-1 rounded">{{ driver.id }}</span>
					</p>
				</div>

				<div class="space-y-4">
					<div class="flex items-center gap-2">
						<span class="font-semibold text-gray-700">Âge:</span>

						<span class="text-gray-800">{{ driver.age }} ans</span>
					</div>

					<div class="flex items-center gap-2">
						<span class="font-semibold text-gray-700">Email:</span>

						<a 
							:href="`mailto:${driver.email}`"
							target="_blank"
							class="text-blue-600 hover:underline"
						>
							{{ driver.email }}
						</a>
					</div>

					<div class="flex items-center gap-2">
						<span class="font-semibold text-gray-700">Type de permis moto:</span>

						<span class="text-gray-800">{{ driver.motorcycleLicenseType }}</span>
					</div>

					<div class="flex items-center gap-2">
						<span class="font-semibold text-gray-700">Expérience de conduite:</span>

						<span class="text-gray-800">{{ driver.drivingExperience }}</span>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-10 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
			<h3 class="text-2xl font-bold text-gray-900 mb-4">
				Motos possédées
			</h3>

			<div
				v-if="isLoading"
				class="flex justify-center items-center h-40"
			>
				<p>Chargement des données...</p>
			</div>

			<div
				v-else
				class="w-full"
			>
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
								v-for="column in table.getAllColumns().filter((column: Column<formattedMotorcycle, unknown>) => column.getCanHide())"
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
		</div>
	</AdminSection>
</template>
