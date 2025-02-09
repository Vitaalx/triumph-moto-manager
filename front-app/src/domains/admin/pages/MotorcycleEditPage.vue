<script setup lang="ts">
import { useRouteParams } from "@/composables/useRouteParams";
import { routerPageName } from "@/router/routerPageName";
import { z } from "zod";
import { useMotorcycleEdit } from "../composables/useMotorcycleEdit";
import AdminSection from "../components/AdminSection.vue";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import TheInput from "@/components/ui/input/TheInput.vue";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import { TheCalendar } from "@/components/ui/calendar";
import { ThePopover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@lib/utils";
import { DateFormatter, getLocalTimeZone, parseDate, today, type DateValue } from "@internationalized/date";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { toDate } from "radix-vue/date";
import { computed, ref } from "vue";

const params = useRouteParams({
	licensePlate: z.string(),
});
const { MOTORCYCLE_LIST } = routerPageName;

const { isLoaded, onSubmit, values, setFieldValue } = useMotorcycleEdit(params.value.licensePlate);

const df = new DateFormatter("fr-FR", {
	dateStyle: "long",
});


const warrantyEndDatePlaceholder = ref<DateValue>();

const warrantyEndDate = computed({
	get: () => values.warrantyEndDate ? parseDate(values.warrantyEndDate.split("T")[0]) : undefined,
	set: val => val,
});
</script>

<template>
	<AdminSection
		:title="`Modifier la moto ${params.licensePlate}`"
		:back-to="MOTORCYCLE_LIST"
	>
		<div v-if="!isLoaded">
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
					name="brand"
				>
					<FormItem>
						<FormLabel>Marque*</FormLabel>

						<FormControl>
							<TheInput
								type="text"
								placeholder="Yamaha"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
  
				<FormField
					v-slot="{ componentField }"
					name="model"
				>
					<FormItem>
						<FormLabel>Modèle*</FormLabel>

						<FormControl>
							<TheInput
								type="text"
								placeholder="MT-07"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
			</div>
  
			<FormField
				v-slot="{ componentField }"
				name="licensePlate"
			>
				<FormItem>
					<FormLabel>Immatriculation*</FormLabel>

					<FormControl>
						<TheInput
							type="text"
							placeholder="AA-123-BB"
							v-bind="componentField"
							disabled
						/>
					</FormControl>

					<FormMessage />
				</FormItem>
			</FormField>
  
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField
					v-slot="{ componentField }"
					name="year"
				>
					<FormItem>
						<FormLabel>Année*</FormLabel>

						<FormControl>
							<TheInput
								type="number"
								placeholder="2020"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
  
				<FormField
					v-slot="{ componentField }"
					name="price"
				>
					<FormItem>
						<FormLabel>Prix*</FormLabel>

						<FormControl>
							<TheInput
								type="number"
								placeholder="7500"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
			</div>
  
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField
					v-slot="{ componentField }"
					name="maintenanceInterval"
				>
					<FormItem>
						<FormLabel>Kilométrage (en km)*</FormLabel>

						<FormControl>
							<TheInput
								type="number"
								placeholder="2000"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>

				<FormField
					v-slot="{ componentField }"
					name="mileage"
				>
					<FormItem>
						<FormLabel>Intervalle de maintenance (en km)*</FormLabel>

						<FormControl>
							<TheInput
								type="number"
								placeholder="6000"
								v-bind="componentField"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				</FormField>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField name="warrantyEndDate">
					<FormItem class="flex flex-col">
						<FormLabel>Date de fin de garantie</FormLabel>

						<ThePopover>
							<PopoverTrigger as-child>
								<FormControl>
									<ButtonPrimary
										variant="outline"
										:class="cn(
											'ps-3 text-start font-normal',
											!warrantyEndDate && 'text-muted-foreground',
										)"
									>
										<span>{{ warrantyEndDate ? df.format(toDate(warrantyEndDate)) : "Choisir une date" }}</span>

										<CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
									</ButtonPrimary>
								</FormControl>
							</PopoverTrigger>

							<PopoverContent class="w-auto p-0">
								<TheCalendar
									v-model:placeholder="warrantyEndDatePlaceholder"
									v-model="warrantyEndDate"
									calendar-label="Date de fin de garantie"
									initial-focus
									:min-value="today(getLocalTimeZone())"
									@update:model-value="(v) => {
										if (v) {
											setFieldValue('warrantyEndDate', v.toString())
										}
										else {
											setFieldValue('warrantyEndDate', undefined)
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
					Modifier
				</ButtonPrimary>
			</div>
		</form>
	</AdminSection>
</template>
  
