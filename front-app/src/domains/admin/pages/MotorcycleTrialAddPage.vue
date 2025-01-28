<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import { useDriverGetAll } from "../composables/useDriverGetAll";
import { useMotorcycleGetAll } from "../composables/useMotorcycleGetAll";
import { useMotorcycleTrialAdd } from "../composables/useMotorcycleTrialAdd";
import AdminSection from "../components/AdminSection.vue";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	TheSelect,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import { TheCalendar } from "@/components/ui/calendar";
import { ThePopover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@lib/utils";
import { DateFormatter, getLocalTimeZone, parseDate, today, type DateValue } from "@internationalized/date";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { toDate } from "radix-vue/date";
import { computed, ref } from "vue";

const { MOTORCYCLE_TRIAL_CURRENT_LIST } = routerPageName;
const { drivers, isLoading: isDriversLoading } = useDriverGetAll();
const { motorcycles, isLoading: isMotorcyclesLoading } = useMotorcycleGetAll();
const { onSubmit, values, setFieldValue } = useMotorcycleTrialAdd();

const df = new DateFormatter("fr-FR", {
	dateStyle: "long",
});

const startDatePlaceholder = ref<DateValue>();
const endDatePlaceholder = ref<DateValue>();

const startDate = computed({
	get: () => values.startDate ? parseDate(values.startDate) : undefined,
	set: val => val,
});

const endDate = computed({
	get: () => values.endDate ? parseDate(values.endDate) : undefined,
	set: val => val,
});
</script>

<template>
	<AdminSection
		title="Ajout d'un essai moto"
		:back-to="MOTORCYCLE_TRIAL_CURRENT_LIST"
	>
		<div v-if="isDriversLoading || isMotorcyclesLoading">
			Chargement des données...
		</div>

		<form
			v-else
			@submit="onSubmit"
			class="space-y-6"
		>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField
					v-slot="{ componentField }"
					name="driverId"
				>
					<FormItem>
						<FormLabel>Pilote</FormLabel>

						<TheSelect v-bind="componentField">
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Sélectionner un pilote" />
								</SelectTrigger>
							</FormControl>

							<SelectContent>
								<SelectGroup>
									<SelectItem
										v-for="driver in drivers"
										:key="driver.id"
										:value="driver.id"
									>
										{{ driver.fullName }}
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</TheSelect>

						<FormMessage />
					</FormItem>
				</FormField>

				<FormField
					v-slot="{ componentField }"
					name="motorcycleId"
				>
					<FormItem>
						<FormLabel>Moto</FormLabel>

						<TheSelect v-bind="componentField">
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Sélectionner une moto" />
								</SelectTrigger>
							</FormControl>

							<SelectContent>
								<SelectGroup>
									<SelectItem
										v-for="motorcycle in motorcycles"
										:key="motorcycle.licensePlate"
										:value="motorcycle.licensePlate"
									>
										{{ motorcycle.brand }} - {{ motorcycle.model }}
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</TheSelect>

						<FormMessage />
					</FormItem>
				</FormField>
			</div>
  
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField name="startDate">
					<FormItem class="flex flex-col">
						<FormLabel>Date de début</FormLabel>

						<ThePopover>
							<PopoverTrigger as-child>
								<FormControl>
									<ButtonPrimary
										variant="outline"
										:class="cn(
											'ps-3 text-start font-normal',
											!startDate && 'text-muted-foreground',
										)"
									>
										<span>{{ startDate ? df.format(toDate(startDate)) : "Choisir une date" }}</span>

										<CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
									</ButtonPrimary>
								</FormControl>
							</PopoverTrigger>

							<PopoverContent class="w-auto p-0">
								<TheCalendar
									v-model:placeholder="startDatePlaceholder"
									v-model="startDate"
									calendar-label="Date de début"
									initial-focus
									:min-value="today(getLocalTimeZone())"
									@update:model-value="(v) => {
										if (v) {
											setFieldValue('startDate', v.toString())
										}
										else {
											setFieldValue('startDate', undefined)
										}
									}"
								/>
							</PopoverContent>
						</ThePopover>

						<FormMessage />
					</FormItem>
				</FormField>

				<FormField name="endDate">
					<FormItem class="flex flex-col">
						<FormLabel>Date de fin</FormLabel>

						<ThePopover>
							<PopoverTrigger as-child>
								<FormControl>
									<ButtonPrimary
										variant="outline"
										:class="cn(
											'ps-3 text-start font-normal',
											!endDate && 'text-muted-foreground',
										)"
									>
										<span>{{ endDate ? df.format(toDate(endDate)) : "Choisir une date" }}</span>

										<CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
									</ButtonPrimary>
								</FormControl>
							</PopoverTrigger>

							<PopoverContent class="w-auto p-0">
								<TheCalendar
									v-model:placeholder="endDatePlaceholder"
									v-model="endDate"
									calendar-label="Date de fin"
									initial-focus
									:min-value="startDate || today(getLocalTimeZone())"
									@update:model-value="(v) => {
										if (v) {
											setFieldValue('endDate', v.toString())
										}
										else {
											setFieldValue('endDate', undefined)
										}
									}"
								/>
							</PopoverContent>
						</ThePopover>

						<FormMessage />
					</FormItem>
				</FormField>
			</div>
  
			<div class="flex justify-end">
				<ButtonPrimary type="submit">
					Ajouter l'essai
				</ButtonPrimary>
			</div>
		</form>
	</AdminSection>
</template>
